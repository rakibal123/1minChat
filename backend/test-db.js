import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected");
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  console.log(collections.map(c => c.name));
  process.exit(0);
}
test();
