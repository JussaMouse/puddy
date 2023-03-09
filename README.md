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

another example import.txt below:
coolPalette
hex
'#ff0000'
'#00ff00'
'#0000ff'
...
```

once you have pasted all the colors you want to save into import.txt,
use the following command in the terminal:
$ node import.mjs
this should prompt you for the location of your allP.json
(the database of all your palettes).

the idea is that, whichever of the 3 color types you are importing,
the import script will add that palette to the database object in
allP.json, and also automatically convert the colors to the
other 2 types and add those to the database object, too.

once finished importing, you can open index.html with Live Server vscode extension,
or your web server of choice. it should load index.js and show grids and names
for all your palettes, to browse.

obviously a million and one features need to be added. even what i've
outlined above isn't 100% finished, but this is my
plan for how to organise the app
