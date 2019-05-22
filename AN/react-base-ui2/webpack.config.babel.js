import webpack from 'webpack';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import rules from './build/sections/rules';

const _env_ = process.env.NODE_ENV;
const _static_ = !!process.env.STATIC;

const webpackConfig = {
  entry: {
    'react-base-ui': ['./src/index.js']
  },
  output: {
    path: 'dist/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['./', 'node_modules']
  },
  module: {
    rules
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(_env_),
      __STATIC__: JSON.stringify(_static_)
    })
  ]
};

if (_env_ === 'production') {
  webpackConfig.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    })
  );
} else {
  webpackConfig.devtool = '#inline-source-map';
}

module.exports = webpackConfig;
