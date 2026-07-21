const express = require("express");
const app = express();

const customError = require("./Utils/customError");
const errorHandeler = require("./Controllers/errorController");
const messageRouter = require('./Routers/messageRouter')


app.use(express.json());


app.use("/api/v1/message", messageRouter);

// Handle 404 for API routes only
app.all(/(.*)/, (req, res, next) => {
  const err = new customError(
    `can not found this url=> ${req.originalUrl} please try again`,
    404,
  );
  next(err);
});

app.use(errorHandeler);

module.exports = app;