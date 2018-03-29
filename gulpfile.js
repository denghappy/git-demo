/**
 * Created by Administrator on 2018/3/28.
 */
'use strict';
//任务
//1、less 编译、压缩、合并
//2、js合并、混淆、压缩
//3、img复制
//4、html压缩

//载入包
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');

//注册任务

var concat = require('gulp-concat');
//1、less编译、压缩、合并
gulp.task('style',function(){
    //执行style任务时自动执行的
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream:true
        }));
});


var uglify = require('gulp-uglify');
//2、js合并、混淆、压缩
gulp.task('script',function(){
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream:true
        }));
});


//3、img复制
gulp.task('image',function(){
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream:true
        }));
});


var htmlmin = require('gulp-htmlmin');
//4、html压缩
gulp.task('html',function(){
    gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace:true,
            removeComments:true}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream:true
        }));//浏览器自动刷新
});


var browserSync = require('browser-sync');
gulp.task('serve',function(){
    browserSync({
        server:{
            baseDir:'dist/'
        }
    },function(err,bs){
        console.log(bs.options.getIn(["urls","local"]))
    });

    //监听事件
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);

});