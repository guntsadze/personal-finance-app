import dotenv from "dotenv/config";

export const env = {
  PORT: Number(process.env.PORT) || 4000,
  MONGO_URL: process.env.MONGO_URL
};
