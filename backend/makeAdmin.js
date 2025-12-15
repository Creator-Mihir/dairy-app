import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import User from "./src/models/user.model.js";

dotenv.config();
connectDB();

const makeUserAdmin = async () => {
  try {
    // 👇 REPLACE THIS WITH YOUR LOGIN EMAIL
    const emailToPromote = "akshaygurjar286@gmail.com"; 

    const user = await User.findOne({ email: emailToPromote });

    if (user) {
      user.isAdmin = true;
      await user.save();
      console.log(`✅ Success! ${user.name} is now an Admin.`);
    } else {
      console.log("❌ User not found!");
    }
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

makeUserAdmin();