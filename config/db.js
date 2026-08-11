import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
    console.log("Database:", conn.connection.name);
  } catch (error) {
    console.log("Error in DB Connection");
    console.error(error.message);
    process.exit(1);
  }
};

