import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackRequireFrom from 'webpack-require-from';
import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import _debug from 'debug';

import output from './output';

const debug = _debug('anet-cui:webpack:plugins');
debug('Building plugins....');

const env = process.env.NODE_ENV || 'development';
const stats = !!process.env.STATS;
const definitions = {
  'process.env.NODE_ENV': JSON.stringify(env),
  NODE_ENV: JSON.stringify(env),
  __STATIC__: env === 'static',
  __DEV__: env === 'development',
  __PRODUCTION__: env === 'production',
  __TESTING__: env === 'test',
  __SERVERRENDER__: env === 'server',
  __TESTINGHOST__: '',
  __TESTINGPORT__: ''
};

/* eslint-disable */
/**
 * It is a webpack 2.x legacy issue, 3.x has solved this issue.
 * Need to remove this pulgin if upgrade to 3.x
 */
function failOnCompilationErrorPlugin() {
  var isWatch = true;

  this.plugin("run", function(compiler, callback) {
    isWatch = false;
    callback.call(compiler);
  });

  this.plugin("done", function(stats) {
    if (stats.compilation.errors && stats.compilation.errors.length && !isWatch) {
      process.on('beforeExit', function() {
        process.exit(1);
      });
    }
  });
};
/* eslint-enable */

const plugins = [
  new webpack.DefinePlugin(definitions),
  new webpack.ProvidePlugin({
    Promise: 'bluebird'
  }),
  new WebpackRequireFrom({ replaceSrcMethodName: '__WEBPACK_ASSETS_PATH__' }),
  new CleanWebpackPlugin(['css', 'fonts', 'images', 'js'], {
    root: output.path,
    verbose: true,
    dry: false
  }),
  new CopyWebpackPlugin([
    { from: 'src/shared/assets/js', to: 'js' }
  ])
];

if (process.env.NODE_ENV !== 'test') {
  plugins.push(new CommonsChunkPlugin({
    name: 'vendor',
    filename: (env === 'production' && !stats) ? 'js/[name].[hash].js' : 'js/[name].js',
    minChunks: Infinity
  }));

  plugins.push(new webpack.NoEmitOnErrorsPlugin());
  plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/));

  if (process.env.NODE_ENV === 'static') {
    plugins.push(new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: 'src/index/index.html',
      favicon: 'src/shared/assets/images/active-favicon.ico'
    }));

    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );

    plugins.push(
      new ExtractTextWebpackPlugin({
        filename: 'css/[name].css',
        allChunks: true
      })
    );
  } else {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    );

    plugins.push(
      new ExtractTextWebpackPlugin({
        filename: 'css/[name].[hash].css',
        allChunks: true
      })
    );

    plugins.push(
      new HtmlWebpackPlugin({
        filename: 'index.jsp',
        inject: false,
        diff: 'prod',
        linkExtraPrefix: '',
        template: 'src/index/index.jade',
        favicon: 'src/shared/assets/images/active-favicon.ico'
      })
    );

    if (process.env.NODE_ENV === 'production') {
      plugins.push(
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: stats,
          compress: {
            unused: true,
            dead_code: true,
            warnings: false
          }
        })
      );
      plugins.push(failOnCompilationErrorPlugin);
    }
  }
}

debug(`Plugins number....${plugins.length}`);

export default plugins;
