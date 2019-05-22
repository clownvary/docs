const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const propertiesParser = require('properties-parser')

const PROPERTIES_SUFFIX = '.properties'

function compile(src, dist) {
  mkdirp(dist)

  // prettier-ignore
  const enUSProperties = propertiesParser.read(
    path.resolve(src, `en_US${PROPERTIES_SUFFIX}`)
  )
  const paths = fs.readdirSync(src)

  paths.forEach((v, k) => {
    const filePath = path.resolve(src, v)

    if (fs.lstatSync(filePath).isFile()) {
      propertiesParser.read(filePath, (err, data) => {
        const locale = v.match(/[a-z]{2}_[A-Z]{2}/)[0]
        // prettier-ignore
        const jsonFilePath = path.resolve(
          dist,
          v.replace(PROPERTIES_SUFFIX, '.json')
        )

        // Have en_US as the base
        data = Object.assign({}, enUSProperties, data)

        // prettier-ignore
        // Merge existed JSON messages if exists
        if (fs.existsSync(jsonFilePath)) {
          data = Object.assign(
            {},
            JSON.parse(fs.readFileSync(jsonFilePath)),
            data
          )
        }

        fs.writeFileSync(jsonFilePath, JSON.stringify(data))
      })
    }
  })
}

const { SRC, DIST = 'i18n' } = process.env

SRC.split(',').forEach(src => compile(src, DIST))
