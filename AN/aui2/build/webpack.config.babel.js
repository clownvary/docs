import webpack from 'webpack';
import _debug from 'debug';
import getConfig from './webpack.config';

const debug = _debug('aui:webpack:buid');
/**
 * fix(webpack): remove warning
 * https://github.com/webpack/loader-utils/issues/56
 */
process.noDeprecation = true;

getConfig()
  .then((config) => {
    webpack(config, (
      err,
      stats
    ) => {
      if (err) {
        throw new Error('aui:webpack:build', err);
      }

      debug(stats.toString({
        colors: true,
        chunks: false,
        chunksModules: false,
        modules: false,
        assets: false,
        errorDetails: true,
        children: false
      }));
    });
  });

