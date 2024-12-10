const { Image } = require('imagescript');
const fs = require('fs');
const path = require('path')

function rgbToHex(r, g, b) {
    return `${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}

function writeArrayToFile(array, filePath) {
    // Join the array elements into a single string without any separators
    const data = array.join('');  // You can use a separator like ',' or ' ' if needed

    // Write the string to the specified file
    fs.writeFileSync(filePath, data);
}

async function pngToWaffle(originPath, resultName) {
    // Read the image file into a buffer
    const buffer = fs.readFileSync(originPath);

    // Load the image from the buffer
    const img = await Image.decode(buffer);

    const w = img.width;
    const h = img.height;





    let values = []

    for (let i = 1; i < h + 1; i++) {
        for (let j = 1; j < w + 1; j++) {
            const [r, g, b, a] = img.getRGBAAt(j, i);

            // Convert to hex, but only use RGB values (ignoring alpha)
            const hex = rgbToHex(r, g, b);
            values.push(hex);
        }

        values.push("\n")
    }


    writeArrayToFile(values, resultName + ".waffle")
    return true
}

module.exports = { pngToWaffle };