"use strict";

import {outputDir} from "./app.config";
import del from "del";
import gulp from "gulp";

gulp.task("clean.dev", (done) => {
  return del([outputDir["dev"]], {force: true});
});

gulp.task("clean.prod", (done) => {
  return del([outputDir["prod"]], {force: true});
});

gulp.task("clean.static", (done) => {
  return del([outputDir["static"]], done);
});
