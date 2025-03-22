import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    // Debugging: Ensure the environment variable is loaded
    console.log("MONGO_URL:", process.env.MONGO_URL);

    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined. Check your .env file.");
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Exit if the connection fails
  }
};
