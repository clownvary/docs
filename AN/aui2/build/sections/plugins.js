import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import _debug from 'debug';
import { version as baseVersion } from 'react-base-ui/package.json';
import { version as auiVersion } from '../../package.json';
import { host, port } from './endPoint';
import output from './output';


const debug = _debug('aui:webpack:plugins');
const env = process.env.NODE_ENV || 'development';
const stats = !!process.env.STATS;
const definitions = {
  'process.env.NODE_ENV': JSON.stringify(env),
  __STATIC__: env === 'static',
  __DEV__: env === 'development',
  __PRODUCTION__: env === 'production',
  __TESTING__: env === 'test'
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

const getHtmlPlugins = (jadeTemplatesInfo, MODULESMAP) => {
  const htmlPlugins = [];

  jadeTemplatesInfo.forEach((jadeTemInfo) => {
    htmlPlugins.push(
      new HtmlWebpackPlugin(jadeTemInfo)
    );
  });

  if (env === 'static') {
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        host,
        port,
        MODULESMAP,
        filename: 'index.html',
        inject: false,
        template: 'build/helper/navigation.jade'
      })
    );
  }

  return htmlPlugins;
};

export default function getPlugins(jadeTemplatesInfo, MODULESMAP) {
  debug('Building plugins....');
  const plugins = [
    new webpack.DefinePlugin(definitions),
    new webpack.ProvidePlugin({
      $: 'jquery',
      moment: 'moment',
      Promise: 'bluebird'
    }),
    new CleanWebpackPlugin(['css', 'fonts', 'images', 'js'], {
      root: output.path,
      verbose: true,
      dry: false
    })
  ];

  if (env !== 'test') {
    plugins.push(new CommonsChunkPlugin({
      name: 'vendor',
      filename: (env === 'production' && !stats) ? 'js/[name].[hash].js' : 'js/[name].js'
    }));

    if (env === 'static') {
      plugins.push(
        new webpack.HotModuleReplacementPlugin()
      );
    } else {
      plugins.push(
        new ExtractTextWebpackPlugin({
          filename: 'css/[name].[hash].css',
          allChunks: true
        })
      );

      if (env === 'production') {
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

    const anVersion = JSON.stringify({
      base: baseVersion,
      aui: auiVersion
    });

    plugins.push(new webpack.NoEmitOnErrorsPlugin());
    plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/));
    plugins.push(new webpack.BannerPlugin({
      banner: `window.an_version = ${anVersion};\n`,
      raw: true,
      test: /\.js$/,
      entryOnly: true
    }));
    Array.prototype.push.apply(plugins, getHtmlPlugins(jadeTemplatesInfo, MODULESMAP));
  }

  debug(`Plugins number....${plugins.length}`);

  return plugins;
}
