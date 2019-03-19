const Jimp = require(`jimp`)
const imagemin = require('imagemin')
const imageminPngquant = require('imagemin-pngquant')
const { readdirSync } = require(`fs`)
const { join } = require(`path`)

const relativeToThisFile = relativePath => join(__dirname, relativePath)

const inputPath = relativeToThisFile(`../../book-cover-image`)
const outputPath = relativeToThisFile(`../../Markdown/Web/book-image/thumbnail`)

const files = readdirSync(inputPath)

const toTransform = files.filter(file => /\.png$/.test(file))

toTransform.forEach(filename => {
    const path = join(inputPath, filename)

    Jimp.read(path).then(image => {
        console.log(`Writing`, filename)
        return new Promise((resolve, reject) => {
            const filePath = join(outputPath, filename)
            image
                .autocrop()
                .resize(400, 600)
                .crop(0, 0, 400, 400)
                // .quality(80)
                .write(filePath, err => err ? reject(err) : resolve(filePath))
        })
    }).then(filePath => {
        imagemin([filePath], outputPath, {
            plugins: [
                imageminPngquant({ quality: '70-80' })
            ]
        })
    })
})