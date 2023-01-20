//env variables
require('dotenv').config();

const { DateTime } = require("luxon");

//Plugins
const markdownIt = require("markdown-it");
const svgContents = require("eleventy-plugin-svg-contents");

//Markdown
const md = new markdownIt({
  html: true
});

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = config => { 

  config.addPassthroughCopy("src/images");
  config.addPassthroughCopy({"src/scripts": "js"});
  config.addPassthroughCopy({"src/_includes/css": "css"});

  // Add plugins
  config.addPlugin(svgContents);

  // Only minify HTML if we are in production because it slows builds _right_ down
  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
  }

  //Filters
  config.addFilter('markdown', (content) => {
    return md.render(content);
  });

  //Get current month
  config.addGlobalData('thisMonth', function(){ 
    const thisMonth = DateTime.local().monthLong.toLocaleLowerCase();
      return thisMonth;
  });

  //
  // Shortcodes
  //
  config.addShortcode('year', () => `${new Date().getFullYear()}`);

  //Using Luxon https://moment.github.io/luxon/demo/global.html
  config.addShortcode('currentMonth', () => `${DateTime.local().monthLong}`);

  //Collections
  config.addCollection('allMonths', collection => {
    // return [...collection.getFilteredByGlob('./src/months/*.md')];
    //Order months by chronological order
    return [...collection.getFilteredByGlob('./src/months/*.md')].sort((a, b) => {
      return DateTime.fromISO(a.date).toMillis() - DateTime.fromISO(b.date).toMillis();
    });
  });


  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  //Server options
  config.setServerOptions({
    // Default values are shown:

    // Whether the live reload snippet is used
    liveReload: true,

    // Whether DOM diffing updates are applied where possible instead of page reloads
    domDiff: true,

    // The starting port number
    // Will increment up to (configurable) 10 times if a port is already in use.
    port: 8080,

    // Additional files to watch that will trigger server updates
    // Accepts an Array of file paths or globs (passed to `chokidar.watch`).
    // Works great with a separate bundler writing files to your output folder.
    // e.g. `watch: ["_site/**/*.css"]`
    watch: [],

    // Show local network IP addresses for device testing
    showAllHosts: false,

    // Use a local key/certificate to opt-in to local HTTP/2 with https
    https: {
      // key: "./localhost.key",
      // cert: "./localhost.cert",
    },

    // Change the default file encoding for reading/serving files
    encoding: "utf-8",
  });

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: [
      "md",
      "njk",
      "html"
    ],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    dir: {
      input: 'src',
      output: 'docs'
    }
  };

};