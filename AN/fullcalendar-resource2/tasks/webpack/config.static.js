"use strict";

import path from "path";
import webpack from "webpack";
import extend from "extend";
import baseConfig from "./config";
import {host, port, outputDir} from "../app.config";
import ExtractTextPlugin from "extract-text-webpack-plugin";

let config = {
  entry: {
    "vendor": ["jquery", "moment"],
    "app": [
      `webpack-dev-server/client?http://${host}:${port}`,
      "webpack/hot/only-dev-server",
      "./src/resource/main.js",
      "./src/app.js"
    ]
  },
  debug: true,
  devtool: "eval-cheap-module-source-map",
  output: {
    path: outputDir["static"],
    filename: "js/[name].js",
    publicPath: `http://${host}:${port}/`
  },
  module: {
    loaders: [
      {
        test: /\.(less|css)$/,
        loader: "style!css?-minimize&sourceMap!postcss!less?sourceMap",
        include: [path.resolve("src"), path.resolve("node_modules/fullcalendar")]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      __STATIC__: true,
      __PRODUCTION__: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

config.plugins = config.plugins.concat(baseConfig.plugins);
config.module.loaders = config.module.loaders.concat(baseConfig.module.loaders);

module.exports = extend({}, baseConfig, config);
