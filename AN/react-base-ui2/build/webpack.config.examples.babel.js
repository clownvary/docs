import path from 'path';
import _debug from 'debug';
import webpack from 'webpack';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import HTMLWebpackTempalte from 'html-webpack-template';
import rules from './sections/rules';


const isSite = !!process.env.SITE;

const debug = _debug('examples:webpack:config');
debug('Creating webpack config...');

const rootPath = path.resolve(__dirname, '..');
const srcPath = `${rootPath}/examples`;
const mainEntryFile = `${srcPath}/index.jsx`;
const outputPath = `${rootPath}/_site_examples`;


const entry = {
  main: [mainEntryFile]
};

const webpackConfig = {
  entry,
  output: {
    path: outputPath,
    filename: 'js/[name].js',
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['./', 'node_modules']
  },
  resolveLoader: {
    modules: ['node_modules'],
    moduleExtensions: ['-loader']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      Promise: 'es6-promise-promise'
    }),
    new ExtractTextWebpackPlugin({
      filename: 'css/[name].css',
      allChunks: true
    })
  ],
  module: {
    rules: rules.concat([{
      test: /\.md/,
      use: ['raw-loader'],
      include: [path.resolve('doc/api')]
    }])
  },
  devtool: 'inline-source-map',
  watch: !isSite
};

if (isSite) {
  webpackConfig.output.libraryTarget = 'umd';
}

// ------------------------------------
// Plugins
// ------------------------------------

debug('Generating HTMLs with Webpack plugin');
webpackConfig.plugins.push(
    new HTMLWebpackPlugin({
      title: 'React Base UI Examples',
      appMountId: 'app',
      template: HTMLWebpackTempalte,
      inject: false
    })
  );

if (isSite) {
  webpackConfig.output.libraryTarget = 'umd';
} else {
  debug('Enable plugins for live development (HMR, NoErrors).');
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

export default webpackConfig;
