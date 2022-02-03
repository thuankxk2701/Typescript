import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connectDB";
import Products from "./models/products";
import jsonProduct from "./product.json";

const initial = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Products.deleteMany();
    await Products.create(jsonProduct);
    console.log("Success !!!");
    process.exit(0);
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
};

initial();
