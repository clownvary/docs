import 'colors'
import yargs from 'yargs'
import _debug from 'debug'

import build from '../build/build'
import { setExecOptions } from '../build/exec'

const debug = _debug('react-aaui:bin:build')

const argv = yargs
  .help('h')
  .option('verbose', {
    demand: false,
    default: false,
    describe: 'Increased debug output'
  })
  .argv

setExecOptions(argv)

build(argv)
  .catch(err => {
    if (err.stack) {
      debug(err.stack.red)
    } else {
      debug(err.toString().red)
    }
    process.exit(1)
  })
