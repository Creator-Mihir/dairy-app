import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import User from "./src/models/user.model.js";

dotenv.config();
connectDB();

const count = async () => {
  const userCount = await User.countDocuments();
  console.log(`\n🔢 Total Users in Database: ${userCount}\n`);
  process.exit();
};

count();