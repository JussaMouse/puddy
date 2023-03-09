puddy is a system for organizing, converting and displaying 
color palettes using rgb, hsb (hsv), and hex. first, import current palettes
to your database with import, then view your collection with index.html

1.
create an import.txt and put the palette name on the first line
put the color type on the second line: rgb, hsb or hex
below that list the comma separated values in brackets, one per line
or, if hex, list the strings in quotes, one per line

example import.txt below:
```
coolPalette
rgb
[255,0,0]
[0,255,0]
[0,0,255]
...
```

another example import.txt below:
```
coolPalette
hex
'#ff0000'
'#00ff00'
'#0000ff'
...
```

2.
once you have pasted all the colors you want to save into import.txt,
use the following command in the terminal:

```$ node import.mjs```

this should prompt you for the location of your allP.json
(the database of all your palettes).

the idea is that, whichever of the 3 color types you are importing,
the import script will add that palette to the database object in
allP.json, and also automatically convert the colors to the
other 2 types and add those to the database object, too.

3.
once finished importing, you can open index.html with Live Server vscode extension,
or your web server of choice. it should load index.js and show grids and names
for all your palettes, to browse.

obviously a million and one features need to be added. even what i've
outlined above isn't 100% finished, but this is my
plan for how to organise the app.

the syntax of the database JSON file (allP.json) is:

```
{
"duskTillDawn": {
    "description": "Dusk Till Dawn",
    "rgb": [
      [25, 27, 13],
      ...
    ],
    "hsb": [
      [69, 52, 11],
      ...
    ],
    "hex": [
      "#191b0d",
      ...
    ]
  },
"eyeWideShut": {
    "description": "Eyes Wide Shut",
    "rgb": [
      [33, 24, 70],
      ...
    ],
    "hsb": [
      [252, 66, 27],
      ...
    ],
    "hex": [
      "#211846",
      ...
    ]
  }
}
```
