import mongoose from "mongoose";

const connectToMongoose =  async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting to mongoose", error);
  }
}

export default connectToMongoose;