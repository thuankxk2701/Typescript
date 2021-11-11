const express= require('express');
const cors= require('cors');
const path=require('path')
const app=express();
const fileRoutes = require("./routes/fileUpdateRoutes");
// require("dotenv").config();
app.use(cors());

const port = process.env.PORT || 7000;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", fileRoutes);
const init = async () => {
    try {
      app.listen(port, () => {
        console.log(`Listening is with port:${port}...`);
      });
    } catch (err) {
      console.log(err);
    }
  };

init();

  