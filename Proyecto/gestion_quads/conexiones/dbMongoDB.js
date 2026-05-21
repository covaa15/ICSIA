import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();


const uri = process.env.MONGO_URI;

export async function conectarMongo() {
  if (mongoose.connection.readyState === 1)
    return;
    
  await mongoose.connect(uri);
  
}
