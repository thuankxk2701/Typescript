const express = require("express");

const app = express();
const data = require("./data.tsx");

app.get("/api", (req, res) => {
  res.send(data);
});

const port = 7000;

app.listen(port);
