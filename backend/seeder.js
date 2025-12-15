import mongoose from "mongoose";
import dotenv from "dotenv";
import products from "./src/data/products.js";
import Product from "./src/models/product.model.js";
import connectDB from "./src/config/db.js";

dotenv.config();

connectDB(); // Connect to MongoDB

const importData = async () => {
  try {
    // 1. Clear existing products so we don't have duplicates
    await Product.deleteMany(); 

    // 2. Insert the new array of products
    await Product.insertMany(products);

    console.log("✅ Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();