import path from 'path';
/*eslint-disable*/
import _debug from 'debug';
import { host, port } from './endPoint';
/*eslint-enable*/
const debug = _debug('anet-cui:webpack:output');
debug(`Building output for ${process.env.NODE_ENV}....`);

const homeDir = process.platform === 'win32' ? 'C:' : process.env.HOME;
const stats = !!process.env.STATS;

const output = {};
output.filename = 'js/[name].js';
output.chunkFilename = 'js/chunk.[name].js';

if (process.env.NODE_ENV === 'static') {
  output.path = path.resolve('dist');
  output.publicPath = `http://${host}:${port}/`;
} else if (process.env.NODE_ENV === 'development') {
  const devPath = stats ?
    path.join(homeDir, 'active/cui-stats/dev') :
    path.join(homeDir, 'active/ActiveNetCUI/jetty/webapps/ActiveNetCUI');
  output.path = devPath;
  output.publicPath = '/';
} else if (process.env.NODE_ENV === 'production') {
  const prodPath = stats ?
    path.join(homeDir, 'active/cui-stats/prod') :
    path.resolve('../activenet-cui/src/main/webapp');
  output.path = prodPath;
  output.publicPath = '/';
  if (!stats) {
    output.filename = 'js/[name].[hash].js';
    output.chunkFilename = 'js/chunk.[name].[hash].js';
  }
}

debug(`Output path: ${output.path}`);

export default output;
