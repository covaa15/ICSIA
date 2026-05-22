import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

export async function conectarMongo() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(uri);
}