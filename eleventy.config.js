//env variables
require('dotenv').config();
const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const md = new markdownIt({html: true});  
const htmlMinTransform = require('./src/transforms/html-min-transform.js');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = async function(eleventyConfig) {

  const {EleventyRenderPlugin} = await import("@11ty/eleventy");

  // Add passthroughs
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({"src/scripts": "js"});
  eleventyConfig.addPassthroughCopy({"src/_includes/css": "css"});

  // Only minify HTML if we are in production because it slows builds _right_ down
  if (isProduction) {
    eleventyConfig.addTransform('htmlmin', htmlMinTransform);
  }

  //Filters
  eleventyConfig.addFilter('markdown', (content) => {
    return md.render(content);
  });

  //Get current month
  eleventyConfig.addGlobalData('thisMonth', function(){ 
    const thisMonth = DateTime.local().monthLong.toLocaleLowerCase();
      return thisMonth;
  });

  //
  // Shortcodes
  //
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  //Get current Unix timestamp
  eleventyConfig.addShortcode('timestamp', () => `${Date.now()}`);

  //Using Luxon https://moment.github.io/luxon/demo/global.html
  eleventyConfig.addShortcode('currentMonth', () => `${DateTime.local().monthLong}`);

  //Collections
  eleventyConfig.addCollection('allMonths', collection => {
    // return [...collection.getFilteredByGlob('./src/months/*.md')];
    //Order months by chronological order
    return [...collection.getFilteredByGlob('./src/months/*.md')].sort((a, b) => {
      return DateTime.fromISO(a.date).toMillis() - DateTime.fromISO(b.date).toMillis();
    });
  });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  eleventyConfig.setUseGitIgnore(false);

};

module.exports.config = {
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
}