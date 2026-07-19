const cheerio = require("cheerio");

module.exports = (html) => {
  const dom = cheerio.load(html);
  return dom;
};
