import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js"; // <--- CHECK THIS
import productRoutes from "./routes/product.routes.js"; // <-- NEW IMPORT
import orderRoutes from "./routes/order.routes.js"; // <-- NEW IMPORT

dotenv.config();
const app = express();

app.use(cors({
  origin: ["http://localhost:5173", // Allow your React app
  "https://dairy-c9hww805b-mihirs-projects-b031d792.vercel.app/"],
  credentials: true // Allow cookies/tokens if needed
}));
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/api/auth", authRoutes); // <--- CHECK THIS
app.use("/api/products", productRoutes); // <-- NEW ROUTE
app.use("/api/orders", orderRoutes); // <-- NEW ROUTE

// Basic Route
app.get("/", (req, res) => {
  res.send("Dairy Backend Running...");
});

// Server Start
const PORT = process.env.PORT || 5001; // Ensure this matches your .env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});