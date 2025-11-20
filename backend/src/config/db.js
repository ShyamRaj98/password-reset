import mongoose from "mongoose";

const connectDB = async (mongoURI) => {
  try {
    await mongoose.connect(mongoURI, {
      // options are optional in Mongoose 6+
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
