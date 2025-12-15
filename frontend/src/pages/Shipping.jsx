import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const Shipping = () => {
  const { shippingAddress, saveShippingAddress } = useCart();
  const navigate = useNavigate();

  // Load saved data if it exists
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const submitHandler = (e) => {
    e.preventDefault();
    // Save data to Context
    saveShippingAddress({ address, city, postalCode, country });
    // Move to next step (Payment or Place Order)
    navigate("/placeorder"); 
  };

  return (
    <div className="min-h-screen bg-dairy-cream pt-28 pb-12 px-4 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-lg border border-dairy-light w-full max-w-lg h-fit"
      >
        <h1 className="text-3xl font-serif font-bold text-dairy-dark mb-6 text-center">
          Shipping Details 🚚
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          
          {/* Address */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Farm Road, Flat 4B"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-dairy-gold focus:ring-1 focus:ring-dairy-gold"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">City</label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Mumbai"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-dairy-gold focus:ring-1 focus:ring-dairy-gold"
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Postal Code</label>
            <input
              type="text"
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="400001"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-dairy-gold focus:ring-1 focus:ring-dairy-gold"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Country</label>
            <input
              type="text"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="India"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-dairy-gold focus:ring-1 focus:ring-dairy-gold"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-dairy-gold text-white py-3 rounded-lg font-bold text-lg hover:bg-dairy-accent transition-all shadow-md mt-4"
          >
            Continue to Order
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Shipping;