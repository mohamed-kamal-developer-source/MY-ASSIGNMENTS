const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.json({ message: "Hello" });
});

app.get("/about", (req, res) => {
    res.json({ course: "Backend" });
});

app.listen(3000);