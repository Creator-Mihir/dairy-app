import express from "express";
import { 
  addOrderItems, 
  getOrderById, 
  getMyOrders, 
  getOrders,
  updateOrderToDelivered // <--- Import this // <--- Import this
} from "../controllers/order.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js"; // <--- Import 'admin'

const router = express.Router();

// 👇 UPDATE THIS LINE
// POST / -> Everyone can create orders
// GET /  -> Only Admins can see ALL orders
router.route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders); 

router.route("/myorders").get(protect, getMyOrders);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
router.route("/:id").get(protect, getOrderById);

export default router;