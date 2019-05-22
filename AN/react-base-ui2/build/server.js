
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import opn from 'opn';
import _debug from 'debug';
import forEach from 'lodash/forEach';
import { host, port } from './config';
import examplesConfig from './webpack.config.examples.babel';
import sandBoxConfig from './webpack.config.sandbox.babel';

const isSandBox = !!process.env.SANDBOX;
const webpackConfig = isSandBox ? sandBoxConfig : examplesConfig;

const debug = _debug('examples:server');
debug('Webpack starts...');

forEach(webpackConfig.entry, (item, k) => {
  debug(`Loading sample of ${k} from ${item[0]}`);
  item.unshift(`webpack-dev-server/client?http://${host}:${port}/`, 'webpack/hot/dev-server');
});

const server = new WebpackDevServer(webpack(webpackConfig), {
  host,
  port,
  hot: true,
  lazy: false,
  historyApiFallback: true,
  compress: true
});

server.listen(port, host, () => {
  debug(`Server is now running at http://${host}:${port}/.`);
  opn(`http://${host}:${port}/`);
});
