const express = require("express");

const app = express();
const data = require("./data.tsx");
app.use(express.json());

app.get("/api/v1/data", (req, res) => {
  res.json(data);
});

const port = 7000;

app.listen(port);
