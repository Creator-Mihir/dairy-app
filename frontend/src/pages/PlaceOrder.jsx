import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { motion } from "framer-motion";
import { BASE_URL } from "../apiConfig";
const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartItems, shippingAddress, clearCart } = useCart();
  const [error, setError] = useState("");

  // 1. Calculate Prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 500 ? 0 : 40; // Free shipping over ₹500
  const taxPrice = itemsPrice * 0.05; // 5% Tax
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  // 2. Redirect if no shipping address
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  // 3. THE FINAL STEP: Send Order to Backend
  const placeOrderHandler = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo) {
        navigate("/login");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`, // Send the Token!
        },
      };

      // Prepare data for backend
      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id, // Backend needs 'product' as the ID
        })),
        shippingAddress: shippingAddress,
        paymentMethod: "Cash on Delivery", // Default for now
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      };

      // Fire the request!
      const { data } = await axios.post(
        `${BASE_URL}/api/orders`,
        orderData,
        config
      );

      // Success!
      alert("Order Placed Successfully! 🎉");
      clearCart(); // Empty the cart
      navigate("/"); // Go back home (or to a success page)

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-dairy-cream pt-28 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-dairy-dark mb-8">
          Review Your Order
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* ---------------- LEFT COLUMN: DETAILS ---------------- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Shipping Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-dairy-dark mb-4 border-b pb-2">Shipping</h2>
              <p className="text-gray-600 mb-1">
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city}{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-dairy-dark mb-4 border-b pb-2">Payment Method</h2>
              <p className="text-gray-600">
                <strong>Method: </strong> Cash on Delivery (COD)
              </p>
            </div>

            {/* Order Items */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-dairy-dark mb-4 border-b pb-2">Order Items</h2>
              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <Link to="/" className="text-dairy-dark font-medium hover:text-dairy-gold">
                          {item.name}
                        </Link>
                      </div>
                      <div className="text-gray-600">
                        {item.qty} x ₹{item.price} = <span className="font-bold">₹{item.qty * item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ---------------- RIGHT COLUMN: SUMMARY ---------------- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-dairy-light sticky top-28">
              <h2 className="text-xl font-serif font-bold text-dairy-dark mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6 border-b border-gray-100 pb-6 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Items</span>
                  <span>₹{itemsPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shippingPrice === 0 ? "Free" : `₹${shippingPrice}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (5%)</span>
                  <span>₹{taxPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-dairy-dark mb-8">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 text-sm p-3 rounded mb-4">
                  {error}
                </div>
              )}

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={placeOrderHandler}
                className="w-full bg-dairy-gold text-white py-4 rounded-xl font-bold hover:bg-dairy-accent transition-colors shadow-lg"
              >
                PLACE ORDER
              </motion.button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;