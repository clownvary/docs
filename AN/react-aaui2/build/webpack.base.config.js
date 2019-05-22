/* eslint import/no-extraneous-dependencies: off */
const _debug = require('debug')
const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const config = require('./config')

const { __PROD__ } = config.globals
const debug = _debug('react-aaui:webpack:config')

debug('Create configuration.')

const webpackConfig = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.less'],
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'stage-0', 'react'],
          plugins: ['transform-runtime', 'add-module-exports'],
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=images/[name].[ext]',
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
    ],
  },
}

// ------------------------------------
// Style Loaders
// ------------------------------------

// prettier-ignore
webpackConfig.module.rules.push({
  test: /\.(less|css)$/,
  use: ExtractTextWebpackPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: false,
          sourceMap: true,
          autoprefixer: false,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        }
      },
      {
        loader: 'less-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
    publicPath: '/',
  }),
})

// prettier-ignore
webpackConfig.plugins.push(
  // https://webpack.js.org/guides/migrating/#uglifyjsplugin-minimize-loaders
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
  // extracts the css from the js files and puts them on a separate .css file. this is for
  // performance and is used in prod environments. Styles load faster on their own .css
  // file as they dont have to wait for the JS to load.
  new ExtractTextWebpackPlugin({
    filename: 'css/[name].css',
    allChunks: true,
  })
)

if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  // prettier-ignore
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    })
  )
}

module.exports = webpackConfig
