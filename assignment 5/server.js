const app = require("./app");
const client = require("./pg");


app.listen(3010, () => {
  console.log("server has started on port 3000...");
});

client.connect().then(() => {
  console.log("DB connection successful");
});

