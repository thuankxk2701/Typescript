import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import fileRoutes from "./routers/StoreRoutes";
import connectDB from "./db/connectDB";
const app = express();
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 8080;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", fileRoutes);

const init = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Listening is with port:${port}...`);
  });
};

init();