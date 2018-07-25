const fs = require("fs");
const purify = require("purify-css");
const cheerio = require("cheerio");
const minify = require("html-minifier").minify;

const htmlSource = fs.readFileSync(process.argv[2], "utf8");
const $ = cheerio.load(htmlSource);
const styles = $("style");

const css = styles
  .map(function(s) {
    return $(this).html();
  })
  .get()
  .join("\n");

styles.each(function(index, element) {
  if (index > 0) {
    $(this).remove();
  } else {
    $(this).html("");
  }
});

const purified = purify($.html(), css, { minify: true });

$(styles.get(0)).html(purified);

console.log(
  minify($.html(), {
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    sortAttributes: true,
    collapseBooleanAttributes: true,
    decodeEntities: true
  })
);
