
import mongoose from "mongoose";
export const connectToDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;
    try {
      const client = await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
      return client;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
    }
};
  