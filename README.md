## .waffle
A very inefficient file format (10 - 30x as much storage than .png)

Made by me.

### Usage
pngToWaffle(pngPath, resultName).                                            
The path and the name of the result.

waffleToPng(wafflePath, resultname)
Path and the name of the ouput.

### How it works
For png -> waffle, it reads every pixel and makes an array of all of them, then, it writes to a .waffle file (splitting every line of pixels with \n).

Waffle -> png, reads the file, gets the items and w, calculates the h, adds every pixel and exports it.

### This project uses [imagescript](https://www.npmjs.com/package/imagescript) (thanks)
[It's also an NPM package](https://www.npmjs.com/package/waffle-image-format)

Thanks.
