import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Cannot connect to database. Mongo URI not found.');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  mongoose.connect(MONGODB_URI, { socketTimeoutMS: 3000 })
    .catch(error => console.log(error));
}

export default dbConnect;