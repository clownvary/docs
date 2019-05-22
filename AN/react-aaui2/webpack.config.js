import path from 'path'

import webpackBaseConfig from './build/webpack.base.config'
import { dir_umd as dirUmd, globals } from './build/config'

export default {
  ...webpackBaseConfig,

  entry: {
    'react-aaui': './src/index.js',
  },

  output: {
    path: path.resolve(__dirname, dirUmd),
    filename: globals.__PROD__ ? '[name].min.js' : '[name].js',
    chunkFilename: '[name].[chunkhash:8].js', // Use [chunkhash] to add a content-dependent cache-buster to each file.
    library: 'ReactAAUI',
    libraryTarget: 'umd',
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
  ],
}
