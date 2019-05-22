import fsp from 'fs-promise'
import _ from 'lodash'
import path from 'path'

import { dir_base, dir_bower } from '../config'
import { exec } from '../exec'
import copy from 'copy-promise'

const packagePath = path.join(dir_base, 'package.json')
const bowerTemplatePath = path.join(__dirname, 'bower.json')
const bowerJson = path.join(dir_bower, 'bower.json')

const readme = path.join(dir_base, 'README.md')

function bowerConfig() {
  return Promise.all([
    fsp.readFile(packagePath)
      .then(json => JSON.parse(json)),
    fsp.readFile(bowerTemplatePath)
      .then(templateString => _.template(templateString))
  ])
  .then(([pkg, compiledTemplate]) => compiledTemplate({ pkg }))
  .then(config => fsp.writeFile(bowerJson, config))
}

export default function BuildBower() {
  console.log('Building: '.cyan + 'bower module'.green)

  return exec(`rimraf ${dir_bower}`)
    .then(() => fsp.mkdirs(dir_bower))
    .then(() => Promise.all([
      bowerConfig(),
      copy(readme, dir_bower)
    ]))
    .then(() => console.log('Built: '.cyan + 'bower module'.green))
}
