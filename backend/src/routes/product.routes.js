import express from "express";
import { getProducts, 
  getProductById, 
  deleteProduct,
  createProduct,   // <--- Import
  updateProduct,
  

     } from "../controllers/product.controller.js"; // <--- Import deleteProduct
import { protect, admin } from "../middleware/auth.middleware.js"; // <--- Import admin

const router = express.Router();

router.route("/")
.get(getProducts)
.post(protect, admin, createProduct); // <--- Add POST here


router.route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)   // <--- Add DELETE route here
  .put(protect, admin, updateProduct);  

export default router;