import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext"; // Import Context

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, decreaseQty } = useCart();

  // Check if this specific product is already in the cart
  const cartItem = cartItems.find((item) => item._id === product._id);
  const qty = cartItem ? cartItem.qty : 0;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100"
    >
      {/* 1. PRODUCT IMAGE */}
      <div className="relative h-72 overflow-hidden rounded-t-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full object-cover transform hover:scale-105 transition-transform duration-700"
          style={{ height: "300px" }}
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Sold Out
            </span>
          </div>
        )}
        
      </div>

      {/* 2. PRODUCT INFO */}
      <div className="p-6 flex flex-col flex-grow items-center text-center">
        <h3 className="text-2xl font-serif font-bold text-dairy-dark mb-2">
          {product.name}
        </h3>
        
        <p className="text-gray-500 text-sm mb-6 line-clamp-2">
          {product.description}
        </p>

        {/* 3. PRICE & ACTION ROW */}
        <div className="mt-auto w-full flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-2xl font-bold text-dairy-dark">
            ₹{product.price}
          </span>
          
          {/* CONDITIONAL BUTTON LOGIC */}
          {qty === 0 ? (
            // STATE 1: Not in cart -> Show ADD Button
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              className={`px-6 py-2 rounded-full font-bold text-sm tracking-wide transition-all border-2 ${
                product.stock > 0
                  ? "border-dairy-gold text-dairy-gold hover:bg-dairy-gold hover:text-white"
                  : "border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {product.stock > 0 ? "+ ADD" : "N/A"}
            </button>
          ) : (
            // STATE 2: In cart -> Show +/- Controls
            <div className="flex items-center bg-dairy-gold rounded-full px-2 py-1 shadow-md">
              
              {/* Decrease Button */}
              <button 
                onClick={() => decreaseQty(product)}
                className="w-8 h-8 flex items-center justify-center bg-white text-dairy-gold rounded-full font-bold hover:bg-gray-100 transition"
              >
                -
              </button>
              
              {/* Quantity Display */}
              <span className="text-white font-bold w-8 text-center">
                {qty}
              </span>
              
              {/* Increase Button */}
              <button 
                onClick={() => addToCart(product)}
                className="w-8 h-8 flex items-center justify-center bg-white text-dairy-gold rounded-full font-bold hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;