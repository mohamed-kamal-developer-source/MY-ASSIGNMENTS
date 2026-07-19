const fs = require("fs");

module.exports = async (books) => {
  await fs.writeFile( "./data/books.json",JSON.stringify(books, null, 2), (err) => {
    if (!err) {
      console.log("saved");
    }
  });
};
