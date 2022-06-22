const { DateTime } = require("luxon");
const fs = require("fs");
const path = require("path");
const yaml = require("yaml");
const postsDir = path.join(__dirname, "../months");
const isProduction = process.env.NODE_ENV === 'production';

//From https://www.seancdavis.com/posts/generate-random-markdown-files-node/
function formatMarkdown(post) {
  const { body } = post
  delete post.body
  return `---\n${yaml.stringify(post)}---\n\n${body}\n`
}

function generateMonthPost(month, number) {
  return {
    title: month,
    date: DateTime.local().set({ month: number + 1, day: 1 }).toFormat("yyyy-LL-dd"),
    layout: 'layouts/month.njk',
    body: ''
  }
}

module.exports = async function() {
  
  //Get list of months
  const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
  
  //Create list of posts
  let posts = months.map((month, index) => {
    
    //Generate a file for each month
    const filePath = path.join(postsDir, `${month}.md`);
    //Get index of item
    const post = generateMonthPost(month, index);
    const markdownContent = formatMarkdown(post);
    console.log(filePath);
    if (isProduction) {
      fs.writeFileSync(filePath, markdownContent);
    }
    
  });

}