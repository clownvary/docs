import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import getConfig from './webpack.config';
import { devServer } from './sections/devServer';
import { host, port } from './sections/endPoint';
/**
 * fix(webpack): remove warning
 * https://github.com/webpack/loader-utils/issues/56
 */
process.noDeprecation = true;

getConfig()
  .then((config) => {
    new WebpackDevServer(webpack(config), devServer)
      .listen(port, host, (err) => {
        if (err) {
          throw new Error('aui:webpack:build', err);
        }

        console.log(`Listening at http://${host}:${port}`);
      });
  });

