import _debug from 'debug'
import webpack from 'webpack'

import webpackConfig from '../webpack.config'
import config from '../build/config'

const debug = _debug('react-aaui:bin:compile')
const DEFAULT_STATS_FORMAT = config.compiler_stats

;(async function () {
  try {
    debug('Run compiler')
    const stats = await webpackCompiler(webpackConfig)
    if (stats.warnings.length && config.compiler_fail_on_warning) {
      debug('Config set to fail on warning, exiting with status code "1".')
      process.exit(1)
    }
  } catch (e) {
    debug('Compiler encountered an error.', e)
    process.exit(1)
  }
})()

export default function webpackCompiler (webpackConfig, statsFormat = DEFAULT_STATS_FORMAT) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)

    compiler.run((err, stats) => {
      const jsonStats = stats.toJson()

      debug('Webpack compile completed.')
      debug(stats.toString(statsFormat))

      if (err) {
        debug('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      } else if (jsonStats.errors.length > 0) {
        debug('Webpack compiler encountered errors.')
        debug(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        debug('Webpack compiler encountered warnings.')
        debug(jsonStats.warnings.join('\n'))
      } else {
        debug('No errors or warnings encountered.')
      }
      resolve(jsonStats)
    })
  })
}

