import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BASE_URL } from "../apiConfig";
const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Get User Data
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchOrders();
    }
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // 🔑 Send the Token!
        },
      };

      const { data } = await axios.get(`${BASE_URL}/api/orders/myorders`, config);
      setOrders(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch orders.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dairy-cream pt-28 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-dairy-dark mb-2">
          My Account
        </h1>
        <p className="text-gray-500 mb-8">Welcome back, {user?.name}</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* --- LEFT SIDE: USER CARD --- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-dairy-gold rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                {user?.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-dairy-dark">{user?.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{user?.email}</p>
              <button 
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  navigate("/login");
                }}
                className="w-full border border-red-200 text-red-500 py-2 rounded-lg text-sm hover:bg-red-50 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* --- RIGHT SIDE: ORDER HISTORY --- */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-serif font-bold text-dairy-dark mb-6">Order History</h2>

            {loading ? (
              <p>Loading orders...</p>
            ) : error ? (
              <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>
            ) : orders.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={order._id} 
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 border-b border-gray-50 pb-4">
                      <div>
                        <span className="text-xs font-bold text-dairy-gold uppercase tracking-wider">Order ID</span>
                        <p className="text-sm text-gray-400">#{order._id}</p>
                      </div>
                      <div className="mt-2 md:mt-0 text-right">
                        <span className="text-xs font-bold text-gray-400 uppercase">Date</span>
                        <p className="text-sm font-medium text-dairy-dark">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {order.orderItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover bg-gray-100" />
                            <span className="text-gray-700">{item.name} <span className="text-gray-400">x{item.qty}</span></span>
                          </div>
                          <span className="font-medium text-dairy-dark">₹{item.price * item.qty}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                      <span className="text-sm text-gray-500 font-medium">Total Amount</span>
                      <span className="text-xl font-bold text-dairy-dark">₹{order.totalPrice}</span>
                    </div>
                    
                    <div className="mt-3 flex gap-3">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-bold">
                             Processing
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">
                             Cash on Delivery
                        </span>
                    </div>

                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;