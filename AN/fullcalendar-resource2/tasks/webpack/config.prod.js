"use strict";

import path from "path";
import webpack from "webpack";
import extend from "extend";
import baseConfig from "./config";
import {outputDir} from "../app.config";
import ExtractTextPlugin from "extract-text-webpack-plugin";

let config = {
  entry: {
    "fullcalendar-resource": ["./src/resource/main.js"]
  },
  output: {
    path: outputDir["prod"],
    filename: "js/[name].js",
    library: "fullcalendar-resource",
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {
        test: /\.(less|css)$/,
        loader: ExtractTextPlugin.extract("css?minimize!postcss!less", {"publicPath": "../"}),
        include: [path.resolve("src"), path.resolve("node_modules/fullcalendar")]
      }
    ]
  },
  externals: {
    "jquery": "jquery",
    "moment": "moment",
    "fullcalendar": "fullcalendar"
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      __STATIC__: false,
      __PRODUCTION__: true,
      "process.env.BABEL_ENV": JSON.stringify("commonjs"),
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new ExtractTextPlugin("css/[name].css",
      {allChunks: true}
    ),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};


// config.plugins = config.plugins.concat(baseConfig.plugins);
config.module.loaders = config.module.loaders.concat(baseConfig.module.loaders);

module.exports = extend({}, baseConfig, config);
