"use strict";

import gulp from "gulp";
import appConfig, {host, port, outputDir} from "./app.config";
import configDev from "./webpack/config.dev";
import configProd from "./webpack/config.prod";
import configStatic from "./webpack/config.static";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

let firstWebpack = true;

gulp.task("build.dev", function(done) {
  let config = Object.assign({}, configDev);
  new WebpackDevServer(webpack(config), {
    contentBase: outputDir["dev"],
    hot: false,
    quiet: true,
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    stats: {colors: true},
  }).listen(port, host, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log(`Listening at http://${host}:${port}`);
  });
  // webpack(config, function(err, stats) {
  //   if(firstWebpack){
  //     done();
  //     firstWebpack = false;
  //   }
  // });
});


gulp.task("build.prod", function(done) {
  let config = Object.assign({}, configProd);
  webpack(config, function(err, stats) {
    if(firstWebpack){
      done();
      firstWebpack = false;
    }
  });
});

gulp.task("build.static", function(done) {
  let config = Object.assign({}, configStatic);
  new WebpackDevServer(webpack(config), {
    contentBase: outputDir["static"],
    hot: true,
    quiet: true,
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    stats: {colors: true},
  }).listen(port, host, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log(`Listening at http://${host}:${port}`);
  });
});
