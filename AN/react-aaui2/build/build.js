import 'colors'
import bower from './amd/build'
import lib from './lib/build'
import es from './es/build'
import umd from './umd/build'
import copy from 'copy-promise'
import { dir_umd, dir_bower } from './config'
import { exec } from './exec'

export default function Build(options) {
  return Promise.all([
    lib(),
    es(),
    bower(),
    umd(),
  ])
  .then(() => copy(dir_umd, dir_bower))
}
