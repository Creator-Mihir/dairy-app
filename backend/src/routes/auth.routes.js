import express from "express";
import { signup, login } from "../controllers/auth.controller.js";

const router = express.Router();

// Route for registering a new user
router.post("/signup", signup);

// Route for logging in
router.post("/login", login);

export default router;