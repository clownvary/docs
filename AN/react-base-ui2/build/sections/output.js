import path from 'path';
/*eslint-disable*/
import _debug from 'debug';
import { host, port } from './endPoint';
/*eslint-enable*/
const debug = _debug('aui:webpack:output');
debug(`Building output for ${process.env.NODE_ENV}....`);

const homeDir = process.platform === 'win32' ? 'C:' : process.env.HOME;
const stats = !!process.env.STATS;

const output = {};
output.filename = 'js/[name].js';

if (process.env.NODE_ENV === 'static') {
  output.path = path.resolve('dist');
  output.filename = 'js/[name].js';
  output.publicPath = `http://${host}:${port}/`;
} else if (process.env.NODE_ENV === 'development') {
  const devPath = stats ?
    path.join(homeDir, 'active/aui-stats/dev') :
    path.join(homeDir, 'active/ActiveNetServlet/jetty/servlet/app/facility');
  output.path = devPath;
} else if (process.env.NODE_ENV === 'production') {
  const prodPath = stats ?
    path.join(homeDir, 'active/aui-stats/prod') :
    path.resolve('../activenet-servlet/web/app/facility');
  output.path = prodPath;

  if (!stats) {
    output.filename = 'js/[name].[hash].js';
  }
}

debug(`Output path: ${output.path}`);

export default output;
