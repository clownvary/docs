const fs = require('fs')
const colors = require('colors')
const archiver = require('archiver')
const archive = archiver.create('zip', {})

function zip(srcDir = './dist/', destZipFilePath = './active.css.zip') {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(destZipFilePath)

    output.on('close', resolve)
    output.on('error', reject)

    archive.pipe(output)

    archive.bulk([{
      cwd: srcDir,
      src: ['**/*'],
      expand: true
    }])

    archive.finalize()
  })
}

module.exports = zip
