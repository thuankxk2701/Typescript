import  express from  'express';
import  cors from 'cors';
import  path from 'path';
const app=express();
import  fileRoutes from "./routes/fileUpdateRoutes";
require("dotenv").config();
app.use(cors());

const port = process.env.PORT || 7000;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", fileRoutes);

    app.listen(port, () => {
        console.log(`Listening is with port:${port}...`);
      });
 

  