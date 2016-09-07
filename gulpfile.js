var gulp = require('gulp'),
	sass = require('gulp-sass'),
	bourbon = require('node-bourbon'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	browserSync = require('browser-sync').create(),
	uglify = require('gulp-uglify');

gulp.task('browser-sync',function(){
	var files = [
		'js/*/*.js',
		'css/**/*.css',
		'html/*.html',
		'*.html'
	];
	browserSync.init(files,{
		server : {
			baseDir:''
		}
	})
});

gulp.task('sass',function(){
	gulp.src('sass/**/*.scss')
		.pipe(sass({
			outputStyle : 'compressed',
			includePaths: bourbon.includePaths
		}).on('error', sass.logError))
		.pipe(gulp.dest('css'));
})

gulp.task('sass:watch',function(){
	gulp.watch('sass/**/*.scss',['sass']);
})

gulp.task('imagemin',function(){
	gulp.src('big_image/*')
		.pipe(imagemin({
				optimizationLevel : 5,
				progressive: true,
				use:[pngquant()]
			}))
		.pipe(gulp.dest('img'));
})

gulp.task('towww',function(){
	gulp.src('html/**').pipe(gulp.dest('www/html'));
	gulp.src('css/**').pipe(gulp.dest('www/css'));
	gulp.src('js/**').pipe(uglify()).pipe(gulp.dest('www/js'));
	gulp.src('img/**').pipe(gulp.dest('www/img'));
})

gulp.task('default',['browser-sync','sass','sass:watch'],function(){
	console.log('my name is dabin!');
})