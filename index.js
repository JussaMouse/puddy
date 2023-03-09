let palettes;
let myColorMode;

function preload() {
  palettes = loadJSON("./allP.json");
}

function setup() {
  createCanvas(1300, 5000);
  background(255, 250, 245);
  myColorMode = "rgb";

  fill(25);
  textFont("JetBrains Mono");
  textSize(30);
  text("index", 60, 60);
  textSize(22);
  text(`clipboard mode: ${myColorMode}`, 260, 60);
  textSize(14);
  translate(60,100)
  let row = 0;
  for (palette of Object.keys(palettes)) {
    let name = palettes[palette].description;
    let colors =
      myColorMode == "hsb" ? palettes[palette].hsb : palettes[palette].rgb;
    fill(25);
    text(
      `${palettes[palette].description} (${colors.length})`,
      0, row * 180
    );
    for (let col = 0; col < colors.length; col++) {
      fill(colors[col]);

      if (col < 12) {
        rect(60 + col * 50, 105 + row * 180, 50, 50);
      } else if (col < 24) {
        rect(60 + (col % 12) * 50, 155 + row * 180, 50, 50);
      } else {
        rect(60 + (col % 24) * 50, 205 + row * 180, 50, 50);
      }
    }

    row++;
  }
}

function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}
