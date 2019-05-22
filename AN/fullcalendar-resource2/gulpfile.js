"use strict";

require('babel-register');
var gulp = require("gulp");
var runSeq = require("run-sequence");
var requireDir = require('require-dir');
requireDir('./tasks', {recurse: true});

gulp.task("default", ["dev"]);

//Run dev mode.
gulp.task("dev", function(done) {
  return runSeq("clean.dev", "build.dev", done);
});

//Run prod mode.
gulp.task("prod", function(done) {
  return runSeq("clean.prod", "build.prod", done);
});

//Run static mode.
gulp.task("static", function(done) {
  return runSeq("clean.static", "build.static", done);
});
