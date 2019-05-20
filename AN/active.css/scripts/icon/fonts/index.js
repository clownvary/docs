const fs = require('fs')
const path = require('path')
const colors = require('colors')
const ttf2woff2 = require('ttf2woff2')

const MESSAGES = {
  START: 'Start build fonts...',
  ERROR: '    Build fonts failed.',
  SUCCESS: '    Build fonts successful.',
  CONVERSUCCESS: '    Covert aui_icons.ttf to aui_icons.woff2 successful.',
  CONVERFAILED: '    Covert aui_icons.ttf to aui_icons.woff2 failed.',
}

const OUTPUT_PATH = path.join(path.resolve(), 'fonts/')
const DOCS_FONTS_OUTPUT_PATH = path.join(path.resolve(), 'docs/fonts/')
const DIST_FONTS_OUTPUT_PATH = path.join(path.resolve(), 'dist/fonts/')

const copyFiles = filesPath =>
  new Promise((resolve, reject) => {
    try {
      filesPath.forEach(file => {
        const fileType = file.split('/aui_icons.')[1]
        const fileName = 'aui_icons.' + fileType
        const outputPath = OUTPUT_PATH + fileName
        const docsFontsOutputPath = DOCS_FONTS_OUTPUT_PATH + fileName
        const distFontsOutputPath = DIST_FONTS_OUTPUT_PATH + fileName

        console.log('    Output ' + fileName + ' to ' + outputPath)
        console.log('    Output ' + fileName + ' to ' + docsFontsOutputPath)
        console.log('    Output ' + fileName + ' to ' + distFontsOutputPath)

        fs.writeFileSync(outputPath, fs.readFileSync(file))
        fs.writeFileSync(docsFontsOutputPath, fs.readFileSync(file))
        fs.writeFileSync(distFontsOutputPath, fs.readFileSync(file))
      })
      return resolve()
    } catch (e) {
      console.log(e)
      return reject()
    }
  })

const generateWoff2 = filesPath =>
  new Promise((resolve, reject) => {
    try {
      const ttfPath = filesPath.find(
        file => file.split('/aui_icons.')[1] === 'ttf'
      )
      const woff2Path = ttfPath.replace(/\.ttf$/g, '.woff2')
      const ttfInput = fs.readFileSync(ttfPath)

      fs.writeFileSync(woff2Path, ttf2woff2(ttfInput))
      console.log(colors.yellow(MESSAGES.CONVERSUCCESS))
      return resolve(filesPath.concat([woff2Path]))
    } catch (e) {
      console.log(e)
      return reject(MESSAGES.CONVERFAILED)
    }
  })

module.exports = filesPath =>
  new Promise((resolve, reject) => {
    try {
      console.log(MESSAGES.START)
      return generateWoff2(filesPath)
        .then(copyFiles)
        .then(() => {
          console.log(colors.yellow(MESSAGES.SUCCESS))
          return resolve()
        })
        .catch(e => reject(e || MESSAGES.ERROR))
    } catch (e) {
      console.log(e)
      return reject(MESSAGES.ERROR)
    }
  })
