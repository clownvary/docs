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
      "./src/resource/main.js",
      "./src/app.js"
    ]
  },
  watch: true,
  devtool: "inline-source-map",
  output: {
    path: outputDir["dev"],
    filename: "js/[name].js",
    publicPath: `http://${host}:${port}/`
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
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
      __STATIC__: false,
      __PRODUCTION__: false,
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    new ExtractTextPlugin("css/[name].css",
      {allChunks: true}
    )
  ]
};

config.plugins = config.plugins.concat(baseConfig.plugins);
config.module.loaders = config.module.loaders.concat(baseConfig.module.loaders);

module.exports = extend({}, baseConfig, config);
