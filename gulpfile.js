const gulp = require('gulp');

//Styles, scripts and optimisation there of
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssclean = require('postcss-clean');

//Images & SVGs
const imagemin = require('gulp-imagemin');
const svgmin = require('gulp-svgmin');
const svgsprite = require('gulp-svg-sprite');
const svgstore = require('gulp-svgstore');
const responsive = require('gulp-responsive');


//Build tools
const data = require('gulp-data');
const nunjucks = require('nunjucks');
const markdown = require('nunjucks-markdown');
const marked = require('marked');
const gulpnunjucks = require('gulp-nunjucks');
const banner = require('gulp-banner');
const htmlbeautify = require('gulp-html-beautify');
const removeEmptyLines = require('gulp-remove-empty-lines');


//System and Utilities
const extReplace = require("gulp-ext-replace");
const del = require('del');
const path = require('path');
const plumber = require('gulp-plumber');
const inject = require('gulp-inject');
const rename = require('gulp-rename');
const bump = require('gulp-bump');
const shell = require('gulp-shell');
const browserSync = require('browser-sync').create();
const log = require('fancy-log');
const colors = require('ansi-colors');

//Ger package vars
const pkg = require('./package.json');

// Variables
// -----------------
const dir = {
 dist: './docs/',
 src: './src/',
 styles: './assets/styles/',
 scripts: './assets/scripts/'
};

// Banner to be injected into production build CSS file
const comment = '/*\n' +
    ' * Automatically Generated - DO NOT EDIT \n' +
    ' * Generated on <%= new Date().toISOString().substr(0, 19) %> \n' +
    ' * <%= pkg.name %> <%= pkg.version %>\n' +
    ' * <%= pkg.description %>\n' +
    ' * <%= pkg.homepage %>\n' +
    ' *\n' +
    ' * Copyright <%= new Date().getFullYear() %>, <%= pkg.author %>\n' +
    ' * Released under the <%= pkg.license %> license.\n' +
    '*/\n\n';


// Development Tasks
// -----------------

//Nunjucks

// Markdown vars
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(dir.src));
markdown.register(env, marked);

//Add global context {{ getContext() | dump| safe }}
env.addGlobal('getContext', function() { 
  return this.ctx;
})

// Get version from package.json
env.addGlobal('pkgVersion', function (str) {
  var cbVersion = pkg.version;
    return cbVersion;
});

//Get current month
env.addGlobal('getCurrentMonth', function(){ 
  var months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
  var now = new Date();
  var thisMonth = months[now.getMonth()]; 
    return thisMonth;
});

//Nunjucks
gulp.task('nunjucks', () => {
  return gulp
    .src(path.join(dir.src, '/*.html'))
    //Get some data
    .pipe(data(function() {
      return require('./data/data.json')
    }))
    .pipe(gulpnunjucks.compile("", {env: env}))
    .pipe(gulp.dest(dir.dist))
});

//  Sass: compile sass to css
//===========================================
gulp.task('sass', () => {
  return gulp
    .src(path.join(dir.styles, '*.scss'))
    .pipe(plumber(function(error) {
      // Output an error message
      log(colors.bold.red('Error (' + error.plugin + '): ' + error.message));
      // emit the end event, to properly end the task
      this.emit('end');
    })
    )
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(dir.dist, 'css'))) // Outputs it in the css folder
    .pipe(browserSync.stream()); // reload
});

// Build the production CSS
gulp.task('sass-build', () => {
  return gulp
    .src(path.join(dir.styles, '*.scss'))
    .pipe(plumber(function(error) {
      // Output an error message
      log(colors.bold.red('Error (' + error.plugin + '): ' + error.message));
      // emit the end event, to properly end the task
      this.emit('end');
    })
    )
    .pipe(sass())
    //Polyfill for object fit
    .pipe(postcss([require('postcss-object-fit-images')]))
    //Polyfill for css vars
    .pipe(postcss([postcssCustomProperties()]))
    //Minify
    .pipe(postcss([postcssclean()]))
    .pipe(gulp.dest(path.join(dir.dist, 'css')))
});

// Watchers
gulp.task('watch', () => {
  gulp.watch(path.join(dir.styles, '**/*.scss'), gulp.series('sass'));
  gulp.watch(path.join(dir.scripts, '**/*.js'), gulp.series('scripts'));
  gulp.watch(path.join(dir.src, '**/*.+(html|njk)'), gulp.series('nunjucks'));
  gulp.watch(path.join(dir.dist, '*.+(html|njk)')).on('change', browserSync.reload);
});


// Scripts
gulp.task('scripts', () => {  
  return gulp
    .src([
      'assets/vendor/astro.min.js', //Mobile nav - https://github.com/cferdinandi/astro
      'assets/scripts/scripts.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(path.join(dir.dist, 'scripts')))
});

// Scripts
gulp.task('babel', () => {  
  return gulp.src([
    'assets/scripts/scripts.js'
  ])
  .pipe(babel({
    presets: ['@babel/env'],
    plugins: ['@babel/plugin-transform-template-literals']
   }))
  .pipe(gulp.dest('assets/scripts/babel/'))
});

// Build the production Scripts
gulp.task('scripts-build', () => {  
  return gulp
  .src([
    'assets/vendor/astro.min.js', //Mobile nav - https://github.com/cferdinandi/astro
    'assets/scripts/babel/scripts.js'
  ])
  .pipe(concat('app.js'))
  .pipe(terser()) //accepts ES6 template literals 
  .pipe(gulp.dest(path.join(dir.dist, 'scripts')))
});

// Cleaning
gulp.task('clean', () => del([ dir.dist ]) );

// Images
gulp.task('images', () => {
  return gulp
    .src('assets/images/**/*.+(png|jpg|jpeg|gif|svg|json|ico|json)')
    .pipe(gulp.dest(path.join(dir.dist, 'images')))
});

// SVGs

//Minify
gulp.task('svgmin', () => {
  return gulp
      .src('assets/icons/**/*.svg')
      .pipe(svgmin())
      .pipe(gulp.dest('assets/svgs/'));
});


//Create a symbol sprite from the optimised SVGs
gulp.task('svgstore', () => {
  
  var svgs = gulp
      .src('assets/svgs/**/*.svg')
      .pipe(rename({prefix: 'icon-'}))
      .pipe(svgstore({ inlineSvg: true }));

  function fileContents (filePath, file) {
      return file.contents.toString();
  }

  return gulp
      .src(path.join(dir.dist, 'index.html'))
      .pipe(inject(svgs, { transform: fileContents }))
      .pipe(gulp.dest(dir.dist));
});

// Copying fonts
gulp.task('fonts', () => {  
  return gulp
    .src('assets/fonts/**/*')
    .pipe(gulp.dest(path.join(dir.dist, 'fonts')))
});

// Banner - insert banner into CSS files
gulp.task('banner', () => {
  return gulp
    .src(path.join(dir.dist, 'css/main.css'))
    .pipe(banner(comment, {
        pkg: pkg
    }))
    .pipe(gulp.dest(path.join(dir.dist, 'css')));
});

// Beautify HTML
gulp.task('htmlbeautify', () => {
  return gulp
      .src(path.join(dir.dist, '*.html'))
      .pipe(removeEmptyLines()) //remove empty lines
      .pipe(htmlbeautify({indentSize: 2})) //tidy up HTML
      .pipe(gulp.dest(dir.dist));
});

// Versioning
gulp.task('bump', () => {
  return gulp
    .src('./package.json')
    .pipe(bump({key: 'version', type:'minor'}))
    .pipe(gulp.dest('./'));
});

// Service worker with versioning
gulp.task('serviceworker', () => {
  return gulp
      .src(path.join(dir.src, 'sw.njk.js'))
      .pipe(gulpnunjucks.compile("", {env: env}))
      .pipe(rename('sw.js'))
      .pipe(gulp.dest(dir.dist));
});

// Moving the service worker
gulp.task('move-files', () => {  
  return gulp
    .src([
      'assets/CNAME'
    ])
    .pipe(gulp.dest(dir.dist));
});


// Moving misc files
gulp.task('move-js', () => {  
  return gulp
      .src([
      'assets/vendor/js.cookie.js'
      ])
    .pipe(gulp.dest(path.join(dir.dist, 'scripts')));
});

// Static Server + watching scss/html files
gulp.task('serve', () => {

  browserSync.init({
    server: dir.dist
  });

});

//  Testing
//===========================================
gulp.task('tests', shell.task('$(npm bin)/cypress run'))

// Init
// -----------------
const dev = gulp.series('nunjucks', gulp.parallel('sass', 'scripts', 'serve', 'svgstore', 'watch'));
const build = gulp.series('clean', 'babel', 'nunjucks', gulp.parallel('sass-build', 'scripts-build', 'fonts', 'images'), gulp.parallel('bump', 'serviceworker', 'banner'), 'move-files', 'move-js', 'svgmin', 'svgstore', 'htmlbeautify');
exports.default = dev;
exports.build = build;

//dev: `gulp`
//build for production: `gulp build`