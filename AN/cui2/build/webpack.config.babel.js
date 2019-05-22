import path from 'path';
import entry from './sections/entry';
import output from './sections/output';
import plugins from './sections/plugins';
import rules from './sections/rules';


/**
 * fix(webpack): remove warning
 * https://github.com/webpack/loader-utils/issues/56
 */
process.noDeprecation = true;

const stats = !!process.env.STATS;

let devtool = process.env.NODE_ENV === 'production' ? '' : 'inline-source-map';
devtool = stats ? 'source-mape' : devtool;
const watch = process.env.NODE_ENV === 'development' && !process.env.STATS;

const rootPath = path.resolve();
const resolveModules = [
  path.join(rootPath, 'src'),
  path.join(rootPath, 'i18n'),
  path.join(rootPath, 'test', 'json')
];
resolveModules.push('node_modules');

const resolveLoaderModules = ['node_modules'];

const config = {
  entry,
  output,
  module: {
    rules
  },
  plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.json'],
    modules: resolveModules
  },
  resolveLoader: {
    modules: resolveLoaderModules,
    moduleExtensions: ['-loader']
  },
  devtool,
  watch
};

export default config;
