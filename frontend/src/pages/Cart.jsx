import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { FiTrash2, FiArrowLeft } from "react-icons/fi";

const Cart = () => {
  const { cartItems, addToCart, decreaseQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Calculate Total Price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  // Optional: Add a small delivery fee if order is small
  const shippingPrice = totalPrice > 500 ? 0 : 40; 
  const finalTotal = totalPrice + shippingPrice;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-dairy-cream flex flex-col justify-center items-center text-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-2xl shadow-lg max-w-md"
        >
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-serif font-bold text-dairy-dark mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any fresh dairy yet.</p>
          <Link 
            to="/" 
            className="inline-block bg-dairy-gold text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-dairy-accent transition-all"
          >
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-dairy-cream pt-28 pb-12 px-4 sm:px-6 lg:px-8">       <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-dairy-dark mb-8 flex items-center gap-3">
          <span className="text-dairy-gold">Your</span> Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* ---------------- LEFT: CART ITEMS LIST ---------------- */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <motion.div 
                layout
                key={item._id} 
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
              >
                {/* Image */}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                />
                
                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-dairy-dark">{item.name}</h3>
                  <p className="text-gray-500 text-sm">₹{item.price} / unit</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                  <button 
                    onClick={() => decreaseQty(item)}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-500 font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium text-dairy-dark">{item.qty}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-green-600 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Total for this item */}
                <div className="text-lg font-bold text-dairy-dark w-20 text-right">
                  ₹{item.qty * item.price}
                </div>

                {/* Delete Button */}
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                >
                  <FiTrash2 size={20} />
                </button>
              </motion.div>
            ))}
            
            <Link to="/" className="inline-flex items-center text-dairy-gold font-medium hover:underline mt-4">
              <FiArrowLeft className="mr-2" /> Continue Shopping
            </Link>
          </div>

          {/* ---------------- RIGHT: ORDER SUMMARY ---------------- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-dairy-light sticky top-24">
              <h2 className="text-xl font-serif font-bold text-dairy-dark mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Cost</span>
                  <span>{shippingPrice === 0 ? <span className="text-green-600 font-bold">FREE</span> : `₹${shippingPrice}`}</span>
                </div>
                {shippingPrice > 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    Free shipping on orders above ₹500
                  </p>
                )}
              </div>

              <div className="flex justify-between text-xl font-bold text-dairy-dark mb-8">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>

              <button 
                onClick={() => navigate("/shipping")} // <--- Updated Link                className="w-full bg-dairy-dark text-white py-4 rounded-xl font-bold hover:bg-dairy-gold transition-colors shadow-lg"
                className="w-full bg-dairy-gold text-white py-3 rounded-lg font-bold text-lg hover:bg-dairy-accent transition-all shadow-md mt-4"

             >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;