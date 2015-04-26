'use strict';

var PORT = process.env.PORT || 8080;

var del = require('del');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

gulp.task('html', function() {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('webpack-dev-server', function() {
  var compiler = webpack({
    entry: './src/js/index',
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ }
      ]
    }
  });

  new WebpackDevServer(compiler, {
    contentBase: './dist',
    stats: { colors: true }
  })
  .listen(PORT, 'localhost', function(error) {
    if (error) {
      console.log(error);
    }
  });
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('default', ['clean'], function(cb) {
  return runSequence(
    ['html', 'webpack-dev-server'],
    cb
  );
});
