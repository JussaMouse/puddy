create an import.txt and put the palette name on the first line
put the color type on the second line: rgb, hsb or hex
below that list the comma separated values in brackets, one per line
or, if hex, list the strings in quotes, one per line

example import.txt below:
coolPalette
rgb
[255,0,0]
[0,255,0]
[0,0,255]
...

another example import.txt below:
coolPalette
hex
'#ff0000'
'#00ff00'
'#0000ff'
...

once you have pasted all the colors you want to save into import.txt,
use the following command in the terminal:
$ node import.mjs
this should prompt you for the location of your allP.json
(the database of all your palettes)

once finished importing, you can open index.html with Live Server vscode extension,
or your web server of choice. it should load index.js and show grids and names
for all your palettes, to browse.

obviously a million and one features need to be added, but this is my
skeleton for how to organise the app
