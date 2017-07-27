var gulp= require('gulp'),
      pump= require('pump');
      sass= require('gulp-ruby-sass'),
      pug= require('gulp-pug'),
      bs= require('browser-sync').create();

gulp.task('sass', function(cb){
  pump([
    sass('app/scss/style.scss'), gulp.dest('app/css'), bs.reload({stream:true})
  ],cb);
});

gulp.task('pug', function(cb){
  pump([
    gulp.src('app/pug/+(index|about|contact|services|blog).pug'), pug(),gulp.dest('app'), bs.reload({stream:true})
  ],cb);
});

gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "app"
        }
    });
});

gulp.task('default', ['browser-sync','sass','pug'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/pug/**/*.pug', ['pug']);
  gulp.watch('app/**/*.html').on('change', bs.reload);
  gulp.watch('app/css/*.css').on('change', bs.reload);
  gulp.watch('app/js/*.js').on('change', bs.reload);
});
