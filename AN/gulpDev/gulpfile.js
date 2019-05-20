var gulp = require('gulp');
var browserSync = require('browser-sync').create();
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy:"http://int-cart.apm.activecommunities.com:8099/cuiuat01/newcart"
    });
    console.log('start');
    // gulp.watch(["~/active/ActiveNetCUI/jetty/webapps/ActiveNetCUI/**/*"]).on("change", function () {
    //     console.log('has change');
    //     browserSync.reload();
    // });
    gulp.watch(["./**/*"]).on("change", function () {
        console.log('has change');
        browserSync.reload();
    });
});
