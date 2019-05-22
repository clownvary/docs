const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const inquirer = require('inquirer')
const deasyncPromise = require('deasync-promise')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const HTMLWebpackTempalte = require('html-webpack-template')
const _debug = require('debug')
const webpackConfig = require('./webpack.base.config')
const config = require('./config')

const {
  host,
  port,
  compiler_quiet,
  compiler_stats,
  utils_paths: paths,
} = config
const debug = _debug('react-aaui:webpack:config')

let entries = glob.sync('samples/**/*.js')

const compArg = process.env.COMPONENTS

if (compArg) {
  const entriesFromArgs = compArg.split(',').map(v => `samples/${v.trim()}.js`)

  entriesFromArgs.forEach(v => {
    if (entries.filter(w => v === w).length === 0) {
      // prettier-ignore
      debug('Given sample components name not found, Default make samples for all components')
    } else {
      entries = entriesFromArgs
    }
  })
} else {
  // prettier-ignore
  entries = deasyncPromise(
    inquirer.prompt([
      {
        type: 'checkbox',
        message: 'Please select your entry points here.',
        name: 'entries',
        pageSize: 18,
        choices: entries.map(v => ({
          name: path.basename(v, '.js'),
        })),
        validate: v => {
          if (v.length < 1) return 'At least one is required'
          return true
        },
      },
    ])
  ).entries.map(v => `samples/${v}`)
}
const entry = {}

entries.forEach(item => {
  entry[path.basename(item, '.js')] = [
    path.resolve(`${config.dir_base}/${item}`),
  ]
})

// prettier-ignore
webpackConfig.plugins.push(
  new HTMLWebpackPlugin({
    title: 'React AUI Samples',
    entry,
    inject: false,
    chunksSortMode: 'dependency',
    filename: 'index.html',
    template: `${config.dir_base}/build/index.ejs`,
  })
)

// prettier-ignore
// Next, generating HTMLWebpackPlugin for every entry
Object.keys(entry).forEach(item => {
  webpackConfig.plugins.push(
    new HTMLWebpackPlugin({
      title: `React AUI: ${item}`,
      appMountId: 'root',
      links: [
        '/node_modules/active.css/dist/css/active.css',
      ],
      chunks: [item],
      inject: false,
      chunksSortMode: 'dependency',
      filename: `${item}/index.html`,
      template: HTMLWebpackTempalte,
    })
  )
})

// prettier-ignore
webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  // prints more readable module names in the browser console on HMR updates
  new webpack.NoEmitOnErrorsPlugin()
  // skip the emitting phase whenever there are errors while compiling. This ensures that no assets are emitted that include errors.
)

module.exports = Object.assign(webpackConfig, {
  entry,
  devServer: {
    host,
    port,
    open: true,
    compress: true,
    // enable gzip compression
    historyApiFallback: true,
    // true for index.html upon 404, object for multiple paths
    hot: true,
    // enable HMR on the server
    contentBase: paths.base(),
    // match the output path
    publicPath: '/',
    // match the output `publicPath`
    quiet: compiler_quiet,
    noInfo: compiler_quiet,
    lazy: false,
    stats: compiler_stats,
  },
  output: {
    path: paths.dist(),
    filename: 'js/[name].js',
    publicPath: `http://${host}:${port}/`,
  },
})
