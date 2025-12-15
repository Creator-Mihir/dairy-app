import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  let token;

  // Check if header has "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 1. Get token from header (remove "Bearer " string)
      token = req.headers.authorization.split(" ")[1];

      // 2. Decode token to get User ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find user in DB and attach to request object (exclude password)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Move to the next function (the controller)
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const admin = (req, res, next) => {

  console.log("--- ADMIN CHECK ---");
  console.log("User trying to access:", req.user.email);
  console.log("Is Admin?", req.user.isAdmin);
  console.log("-------------------");
  
  if (req.user && req.user.isAdmin) {
    next(); // Access Granted
  } else {
    res.status(401).json({ message: "Not authorized as an admin" }); // Access Denied
  }
};