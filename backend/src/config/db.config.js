import mongoose from "mongoose";
import { env } from "./env.js";

export default async () => {
  try {
    await mongoose.connect(env.MONGO_URL);
    console.log("DB Connected sucessfully");
  } catch (e) {
    console.log("Cound not connected DB", e);
  }
};
