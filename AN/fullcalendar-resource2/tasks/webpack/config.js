"use strict";

import path from "path";
import webpack from "webpack";
import autoprefixer from "autoprefixer";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import CommonsChunkPlugin from "webpack/lib/optimize/CommonsChunkPlugin";

let config = {
  output: {
    path: "dist/",
    filename: "js/[name].js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    modulesDirectories: ["src", "node_modules"]
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        loader: `babel?${JSON.stringify({
          cacheDirectory: true
        })}`,
        include: [path.resolve("src"), path.resolve("node_modules/fullcalendar")]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file?name=images/[name].[ext]",
        include: [path.resolve("src")]
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file?name=fonts/[name].[ext]",
        include: [path.resolve("src")]
      },
      {
        test: /\.json?$/,
        loader: "file?name=json/[name].[ext]",
        include: [path.resolve("src/api/")]
      },
      { test: /\.html$/, loader: "mustache" }
    ]
  },
  postcss() {
    return [autoprefixer({
      browsers: ["last 2 versions", "ie 9"]
    })];
  },
  plugins: [
    new HtmlWebpackPlugin({
      "filename": "index.html",
      "inject": true,
      "template": "src/index.html"
    }),
    new webpack.DefinePlugin({
      __DEV__: false,
      __STATIC__: false,
      __PRODUCTION__: false
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      moment: "moment"
    }),
    new CommonsChunkPlugin({
      name: "vendor",
      filename: "js/vendor.js"
    })
  ]
};

module.exports = config;
