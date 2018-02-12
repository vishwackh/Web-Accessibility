'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    openURL = require('open'),
    lazypipe = require('lazypipe'),
    rimraf = require('rimraf'),
    wiredep = require('wiredep').stream,
    gulpDocs = require('gulp-ngdocs'),
    Server = require('karma').Server,
    runSequence = require('run-sequence');


// Application Path & Reading bower
var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist',
    test: 'test',
    temp: '.tmp',
    env: 'env',
    docs: 'docs'
};



var paths = {
    scripts: [appConfig.app + '/**/*.js'],
    styles: [appConfig.app + '/**/*.scss'],
    ignorscripts: [
        appConfig.app + '/**/*.js',
        '!' + appConfig.app + '/modules/app.js',
        '!' + appConfig.app + '/modules/interceptors/*',
        '!' + appConfig.app + '/modules/routing/*'
    ],
    test: ['test/spec/**/*.js'],
    testRequire: [
        'test/mock/**/*.js',
        'test/spec/**/*.js'
    ],
    karma: 'karma.conf.js',
    views: {
        main: appConfig.app + '/index.html',
        files: [appConfig.app + '/index.html', appConfig.app + '/modules/**/*.html']
    },
    json: appConfig.app + '/**/*.json',
    dev: appConfig.env + '/dev.json',
    qa: appConfig.env + '/qa.json',
    preprod: appConfig.env + '/preprod.json',
    prod: appConfig.env + '/prod.json'
};


// Reusable pipelines //

var lintScripts = lazypipe()
    .pipe($.jshint, '.jshintrc')
    .pipe($.jshint.reporter, 'jshint-stylish');

var styles = lazypipe()
    .pipe($.sass, {
        outputStyle: 'expanded',
        precision: 10
    })
    .pipe($.autoprefixer, 'last 1 version')
    .pipe(gulp.dest, '.tmp');



//  Tasks  //
gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(styles())
        .pipe($.connect.reload());
});

gulp.task('lint:scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(lintScripts());
});

gulp.task('clean:tmp', function (cb) {
    rimraf('./.tmp', cb);
});

// inject bower components to index.html
gulp.task('bower', function () {
    return gulp.src(paths.views.main)
        .pipe(wiredep({
            directory: 'bower_components',
            ignorePath: '..'
        }))
        .pipe(gulp.dest(appConfig.app));
});
//inject bower components to karma.conf.js
gulp.task('bower:test', function () {
    return gulp.src(paths.karma)
        .pipe(wiredep({
            directory: 'bower_components',
            devDependencies: true,
            ignorePath: '../'
        }))
        .pipe(gulp.dest('./'));
});


// Watch
gulp.task('watch', function () {

    $.watch(paths.styles)
        .pipe($.plumber())
        .pipe(styles())
        .pipe($.connect.reload());

    $.watch(paths.views.files)
        .pipe($.plumber())
        .pipe($.connect.reload());

    $.watch(paths.scripts)
        .pipe($.plumber())
        .pipe(lintScripts())
        .pipe($.connect.reload());

    $.watch(paths.test)
        .pipe($.plumber())
        .pipe(lintScripts());

    gulp.watch('bower.json', ['bower']);
});



// Serve Project

gulp.task('start:client', ['start:server', 'styles'], function () {
    openURL('http://localhost:9000');
});


gulp.task('serve', function (cb) {
    runSequence('env:dev','clean:tmp','bower',['lint:scripts'], ['start:client'],
        'watch', cb);
});

gulp.task('serve:dist', function () {
    $.connect.server({
        root: [appConfig.dist],
        livereload: true,
        port: 9000
    });
});

gulp.task('start:server', function () {
    $.connect.server({
        root: [appConfig.app, '.tmp'],
        livereload: true,
        // Change this to '0.0.0.0' to access the server from outside.
        port: 9000,
        middleware: function (connect) {
            return [connect().use('/bower_components', connect.static('bower_components'))];
        }
    });
});

gulp.task('start:server:test', function () {
    $.connect.server({
        root: ['test', appConfig.app, '.tmp'],
        livereload: true,
        port: 9001,
        middleware: function (connect) {
            return [connect().use('./bower_components', connect.static('bower_components'))];
        }
    });
});

//  Enviroment configurations

// for Development
gulp.task('env:dev', function () {
    gulp.src(paths.dev)
        .pipe($.ngConfig('envVariables'))
        .pipe($.concat('config.js'))
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(gulp.dest(appConfig.app + '/modules'));
});

// for Preproduction
gulp.task('env:preprod', function () {
    gulp.src(paths.preprod)
        .pipe($.ngConfig('envVariables'))
        .pipe($.concat('config.js'))
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(gulp.dest(appConfig.app + '/modules'));
});

// for Quality Asuarance
gulp.task('env:qa', function () {
    gulp.src(paths.qa)
        .pipe($.ngConfig('envVariables'))
        .pipe($.concat('config.js'))
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(gulp.dest(appConfig.app + '/modules'));
});


//  for Production
gulp.task('env:prod', function () {
    gulp.src(paths.prod)
        .pipe($.ngConfig('envVariables'))
        .pipe($.concat('config.js'))
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(gulp.dest(appConfig.app + '/modules'));
});
///////////
// Build //
///////////

gulp.task('clean:dist', function (cb) {
    rimraf('./dist/**/*', cb);
});


gulp.task('src:js', function () {
    return gulp.src(paths.ignorscripts)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(gulp.dest(appConfig.dist));
});

gulp.task('html', function () {
    return gulp.src([appConfig.app + '/**/*.html', !appConfig.app + '/index.html'], {
            dot: true
        })
        .pipe(gulp.dest(appConfig.dist));
});

gulp.task('images', function () {
    return gulp.src(appConfig.app + '/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(appConfig.dist + '/images'));
});

gulp.task('copy:extras', function () {
    return gulp.src(paths.json)
        .pipe(gulp.dest(appConfig.dist));
});

gulp.task('copy:fonts', function () {
    return gulp.src(['bower_components/bootstrap/fonts/*','bower_components/components-font-awesome/fonts/*'])
        .pipe(gulp.dest(appConfig.dist + '/fonts'));
});


gulp.task('client:build', ['html', 'styles', 'src:js'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    return gulp.src(paths.views.main)
        .pipe($.useref({
            searchPath: [appConfig.app, '.tmp']
        }))
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.cleanCss())
        .pipe(cssFilter.restore())
        //.pipe($.rev())
        // .pipe($.revReplace())
        .pipe(gulp.dest(appConfig.dist));
});

// NG docs
gulp.task('ngdocs', function () {
    var options = {
        html5Mode: false,
        title: 'PortalSeed App',
        image: 'app/images/logo.jpg'
    };
    return gulp.src(paths.scripts)
        .pipe(gulpDocs.process(options))
        .pipe(gulp.dest('./docs'));
});

gulp.task('connect_ngdocs', function () {
    $.connect.server({
        root: [appConfig.docs],
        livereload: false,
        port: 8083
    });
});
function runKarma(done, singleRun) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: singleRun || false
    }, done).start();
}


// Finalise the tasks
/**
 * Run test once and exit
 */
gulp.task('test', ['bower:test'],function (done) {
    runKarma(done, true);
});
/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('test:dev',['bower:test'], runKarma);

gulp.task('ngdocs:start', ['ngdocs', 'connect_ngdocs'], function () {
    openURL('http://localhost:8083');
});


// Build Development
gulp.task('build:dev', ['clean:dist'], function () {
    runSequence(['env:dev','images', 'copy:extras', 'copy:fonts', 'client:build']);
});

// Build Quality Asuarance
gulp.task('build:qa', ['clean:dist'], function () {
    runSequence(['env:qa','images', 'copy:extras', 'copy:fonts', 'client:build']);
});

// Build Preproduction
gulp.task('build:preprod', ['clean:dist'], function () {
    runSequence(['env:preprod','images', 'copy:extras', 'copy:fonts', 'client:build']);
});

// Build Production
gulp.task('build:prod', ['clean:dist'], function () {
    runSequence(['env:prod','images', 'copy:extras', 'copy:fonts', 'client:build']);
});

gulp.task('default', ['serve']);
