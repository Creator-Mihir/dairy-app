import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (user && user.isAdmin) {
      fetchOrders();
    } else {
      navigate("/"); // Kick out non-admins
    }
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // Admin Token
        },
      };
      const { data } = await axios.get("http://localhost:5001/api/orders", config);
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-dairy-dark mb-8">
          Admin Dashboard 👨‍💼
        </h1>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-dairy-dark text-white">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">User</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td className="p-4">Loading...</td></tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="p-4 text-sm font-mono text-gray-500">
                        {order._id.substring(0, 10)}...
                      </td>
                      <td className="p-4 font-bold text-gray-700">
                        {order.user?.name || "Unknown"}
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 font-bold text-dairy-dark">
                        ₹{order.totalPrice}
                      </td>
                      {/* Status Column */}
                        <td className="p-4">
                        {order.isDelivered ? (
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                            Delivered
                            </span>
                        ) : (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                            Pending
                            </span>
                        )}
                        </td>

                        {/* Action Column */}
                        <td className="p-4">
                        <button 
                            onClick={() => navigate(`/order/${order._id}`)} // <--- Navigate to details
                            className="bg-dairy-dark text-white px-3 py-1 rounded text-xs font-bold hover:bg-dairy-gold transition-colors"
                        >
                            Manage
                        </button>
                        </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;