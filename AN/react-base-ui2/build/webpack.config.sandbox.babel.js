import path from 'path';
import _debug from 'debug';
import webpack from 'webpack';
import { argv } from 'yargs';
import { question as prompt } from 'readline-sync';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import HTMLWebpackTempalte from 'html-webpack-template';

import rules from '../build/sections/rules';
import sandBoxConfig from '../sandbox/config';

const debug = _debug('sandbox:webpack:config');

const srcPath = path.resolve(__dirname, '../sandbox');
const mainEntryFile = `${srcPath}/main.jsx`;
const outputPath = `${srcPath}/dist`;

let filter = '';
if (argv.p) {
  filter = prompt('Type filter for sample names:');
  filter = filter.toLowerCase();
}

debug('Create configuration.');

const entry = {};
const mainEntryName = 'main';
entry[mainEntryName] = [mainEntryFile];

const samples = sandBoxConfig.entries.filter((sample) => {
  const { name } = sample;
  return name.toLowerCase().indexOf(filter) !== -1;
}).map((sample) => {
  const { name, folderName, icon = 'icon-search' } = sample;
  const id = sample.id || name.replace(' ', '');
  const entryPath = path.resolve(`${srcPath}/${folderName}/index.jsx`);

  entry[id] = [entryPath];

  return {
    id,
    name,
    entryPath,
    icon
  };
});

const webpackConfig = {
  entry,
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['./', 'node_modules']
  },
  output: {
    path: outputPath,
    filename: 'js/[name].js',
    publicPath: '../'
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: 'css/[name].css',
      allChunks: true
    })
  ],
  module: {
    rules
  },
  devtool: 'source-map'
};

// ------------------------------------
// Plugins
// ------------------------------------
debug('Generating HTMLs with Webpack plugin');
webpackConfig.plugins.push(
  new HTMLWebpackPlugin({
    title: 'react-base-ui sandbox',
    mainEntryName,
    samples,
    inject: false,
    template: `${srcPath}/index.ejs`
  })
);

// Next, generating HTMLWebpackPlugin for every entry
samples.forEach((sample) => {
  webpackConfig.plugins.push(new HTMLWebpackPlugin({
    title: `react-base-ui: ${sample.name}`,
    appMountId: 'root',
    scripts: [],
    links: [],
    chunks: [sample.id],
    inject: false,
    filename: `${sample.id}/index.html`,
    template: HTMLWebpackTempalte
  }));
});

debug('Enable plugins for live development (HMR, NoErrors).');
webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin()
);

export default webpackConfig;
