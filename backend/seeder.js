import mongoose from "mongoose";
import dotenv from "dotenv";
import products from "./src/data/products.js";
import User from "./src/models/user.model.js";
import Product from "./src/models/product.model.js";
import Order from "./src/models/order.model.js";
import connectDB from "./src/config/db.js";
import "colors";
dotenv.config();

connectDB();

const importData = async () => {
  try {
    // 1. Clear existing data to avoid duplicates
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // 2. Create the Users (including Admin)
    // If you don't have a users.js file, this part handles it manually:
    const adminUserToCreate = {
      name: "Mihir Rawat",
      email: "mihir@123gmail.com",
      password: "Mihir@123", // The model will hash this if setup correctly
      isAdmin: true,
    };

    // Try to import from file, otherwise use the hardcoded one above
    const createdUsers = await User.insertMany([adminUserToCreate]);    
    // 3. Get the Admin User's ID (It's the first user created)
    const adminUser = createdUsers[0]._id;

    // 4. Add the Admin ID to every product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // 5. Insert the Products
    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}