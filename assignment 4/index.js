const feacher = require("./feacher");
const parser = require("./parser");
const extractor = require("./extractor");
const cleaner = require("./cleaner");
const saver = require("./saver");
const clawler = require("./crawler");

let books = [];
let i = 1;

async function controller(url) {
  const html = await feacher(url);
  const $ = await parser(html);

  const check = await clawler(i, $);

  books.push(...(await extractor($)));

  if (check) {
    const newUrl = await url
      .replace("index.html", `page-${i + 1}.html`)
      .replace(`page-${i}.html`, `page-${i + 1}.html`);

    i++;
    await controller(newUrl);
  } else {
    const cleanBooks = await cleaner(books);
    await saver(cleanBooks);
  }
}

controller(
  "https://books.toscrape.com/catalogue/category/books/sequential-art_5/index.html",
);
