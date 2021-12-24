import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import fileRoutes from "./routers/fileUpdateRoutes";
const app = express();
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 7000;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", fileRoutes);

app.listen(port, () => {
  console.log(`Listening is with port:${port}...`);
});
