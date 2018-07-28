#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(2));
const glob = require("glob");
const fs = require("fs");
const purify = require("purify-css");
const cheerio = require("cheerio");
const minify = require("html-minifier").minify;

glob.sync(argv._[0]).forEach((file, i, files) => {
  const htmlSource = fs.readFileSync(file, "utf8");
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

  const output = minify($.html(), {
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    sortAttributes: true,
    collapseBooleanAttributes: true,
    decodeEntities: true
  });

  console.log(
    `${`${i + 1}/${files.length}`.padStart(
      String(files.length).length * 2 + 1,
      " "
    )} ${file}`
  );
  fs.writeFileSync(file, output);
});
