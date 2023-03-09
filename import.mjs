import { rgbToHsb } from "./rgbToHsb.mjs";
import { rgbToHex } from "./rgbToHex.mjs";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { readFileSync, writeFile } from "fs";

// prompt for allP.json path
const rl = readline.createInterface({ input, output });
let pathJson = await rl.question("path to palettes db (enter for ./allP.json)");
if (pathJson === "") {
  pathJson = "./allP.json";
}
const jsonData = readFileSync(pathJson);
let allP = JSON.parse(jsonData);
console.log(jsonData.toString());
console.log(
  "==================================================================="
);
rl.close();

// prompt for import.txt path
const rl2 = readline.createInterface({ input, output });
let pathImport = await rl2.question(
  "path to import.txt (enter for ./import.txt)"
);
if (pathImport === "") {
  pathImport = "./import.txt";
}

// put import.txt file contents in an array
let importAll = [];
const data = readFileSync(pathImport, { encoding: "utf8", flag: "r" });
data.split(/\r?\n/).forEach((line) => {
  importAll.push(line);
});
console.log(data.toString());
rl2.close();

// palette name (imported)
const importName = importAll[0];

// color format (imported)
const importType = importAll[1];

// auto convert all existing palettes before adding colors
// warning: this script assumes all values of the rgb, hsb and hex arrays
// are aligned already. ie: if allP[palette]hsb exists, then it is the same
// length as allP[palette]rgb.
// and allP[palette]hsb[i] corresponds to allP[palette]rbg[i]
autoConvert(allP);

// add the import.txt colors to the allP object
// (creating or adding to the appropriate palette inside allP)
// the colors will also be converted to the 2 other formats,
// such that all palettes in the allP object contain rgb, hsb, and hex values
addColors(importName, allP);

// export to (and overwrite) ./allP.json
writeFile("./allP.json", JSON.stringify(allP), (err) => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});

console.log("import complete");

function autoConvert(allP) {
  for (let palette in allP) {
    if (allP[palette].rgb != null) {
      let rgb = allP[palette].rgb;
      if (allP[palette].hsb == null) {
        allP[palette].hsb = [];
        for (let i = 0; i < rgb.length; i++) {
          allP[palette].hsb[i] = rgbToHsb(rgb[i]);
        }
      }
      if (allP[palette].hex == null) {
        allP[palette].hex = [];
        for (let i = 0; i < rgb.length; i++) {
          allP[palette].hex[i] = rgbToHex(rgb[i]);
        }
      }
    } else {
      console.log(`${palette}: error: need rgb to autoconvert for now`);
    }
  }
}

function addColors(palette, allP) {
  if (allP[palette] == null) {
    allP[palette] = {};
  }
  for (let i = 2; i < importAll.length; i++) {
    // add new colors to (and create if necessary) its rgb, hsb and hex arrays
    if (importType === "rgb") {
      // create rgb/hsb/hex if necessary
      if (allP[palette].rgb == null) allP[palette].rgb = [];
      if (allP[palette].hsb == null) allP[palette].hsb = [];
      if (allP[palette].hex == null) allP[palette].hex = [];

      let color = JSON.parse(importAll[i]);
      allP[palette].rgb.push(color);
      allP[palette].hsb.push(rgbToHsb(color));
      allP[palette].hex.push(rgbToHex(color));
    } else if (importType === "hsb") {
      console.log("error: no importing hsb, yet :(");
    } else if (importType === "hex") {
      console.log("error: no importing hex, yet :(");
    } else {
      console.log(
        "error: the second line of import.txt must be rgb/hsb/hex :("
      );
    }
  }
}
