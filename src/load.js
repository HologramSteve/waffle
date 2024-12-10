const fs = require("fs")
const path = require('path')
const { Image } = require('imagescript')

function grabFileData(filePath){
    const content = fs.readFileSync(filePath, 'utf8');

    const cleanedContent = content.replace(/\n/g, '');

    const lines = content.split('\n');
    const firstLineLength = lines[0].length;

    // Create an array of every 6 characters
    const chunks = [];
    for (let i = 0; i < cleanedContent.length; i += 6) {
        // Grab 6 characters at a time
        chunks.push(cleanedContent.slice(i, i + 6));
    }

    // Return
    return {
        firstLineLength,
        chunks
    };
}
function hexToRGBAInteger(hex) {

    // Parse the RGB components
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Parse the alpha component (default to 255 for fully opaque)
    const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) : 255;

    // Return the integer RGBA value
    return (r << 24) | (g << 16) | (b << 8) | a;
}

function waffleToPng(path, resultname) {
    const loaddata = grabFileData(path)

    const data = loaddata.chunks
    const w = loaddata.firstLineLength / 6
    const items = data.length
    const h = items / w

    const img = new Image(w, h)
    for (let i = 1; i < h + 1; i++) {
        for (let j = 1; j < w + 1; j++) {
            img.setPixelAt(j, i, hexToRGBAInteger(data[(i - 1) * w + j - 1]))
        }
    }

    img.encode(3) // Encode to png
     .then(rep => {
            fs.writeFileSync(resultname + ".png", rep);
        })

    return {ouput: `File was loaded to ${resultname}.waffle` };
}

module.exports = { waffleToPng };