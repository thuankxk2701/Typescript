import mongoose from "mongoose";

const connectDB = (url: any) =>
  mongoose.connect(url).then(() => console.log("Connect MongoDB Success !"));

export default connectDB;
