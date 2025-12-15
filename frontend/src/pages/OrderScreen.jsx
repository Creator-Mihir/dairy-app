import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../apiConfig";
const OrderScreen = () => {
  const { id } = useParams(); // Get ID from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Get User Info to check if Admin
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get(`${BASE_URL}/api/orders/${id}`, config);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, userInfo]);

  // --- ADMIN ACTION: MARK AS DELIVERED ---
  const deliverHandler = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      // We need to create this route in Backend next!
      await axios.put(`${BASE_URL}/api/orders/${id}/deliver`, {}, config);
      
      // Refresh page to see changes
      window.location.reload();
    } catch (error) {
      alert("Error updating order");
    }
  };

  if (loading) return <div className="pt-32 text-center">Loading Order...</div>;
  if (!order) return <div className="pt-32 text-center">Order Not Found</div>;

  return (
    <div className="min-h-screen bg-dairy-cream pt-28 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-serif font-bold text-dairy-dark mb-2">Order #{order._id}</h1>
        <Link to="/admin/orders" className="text-gray-500 hover:underline mb-8 inline-block">← Back to Dashboard</Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: DETAILS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Shipping Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-dairy-dark mb-4">Shipping</h2>
              <p className="mb-2"><strong>Name:</strong> {order.user.name}</p>
              <p className="mb-2"><strong>Email:</strong> <a href={`mailto:${order.user.email}`} className="text-blue-600">{order.user.email}</a></p>
              <p className="mb-4">
                <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              
              {order.isDelivered ? (
                <div className="bg-green-100 text-green-700 p-3 rounded font-bold">Delivered at {new Date(order.deliveredAt).toLocaleString()}</div>
              ) : (
                <div className="bg-yellow-100 text-yellow-700 p-3 rounded font-bold">Not Delivered</div>
              )}
            </div>

            {/* Order Items */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-dairy-dark mb-4">Items</h2>
              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <span>{item.name}</span>
                    </div>
                    <div className="font-bold">{item.qty} x ₹{item.price} = ₹{item.qty * item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: ACTIONS */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-dairy-dark mb-6">Order Summary</h2>
              <div className="flex justify-between mb-2"><span>Items</span><span>₹{order.itemsPrice}</span></div>
              <div className="flex justify-between mb-2"><span>Shipping</span><span>₹{order.shippingPrice}</span></div>
              <div className="flex justify-between mb-2"><span>Tax</span><span>₹{order.taxPrice}</span></div>
              <div className="flex justify-between font-bold text-xl border-t pt-4 mt-4"><span>Total</span><span>₹{order.totalPrice}</span></div>

              {/* ONLY SHOW THIS BUTTON TO ADMIN */}
              {userInfo && userInfo.isAdmin && !order.isDelivered && (
                <button 
                  onClick={deliverHandler}
                  className="w-full bg-dairy-gold text-white font-bold py-3 rounded-lg mt-6 hover:bg-dairy-accent transition shadow-md"
                >
                  MARK AS DELIVERED
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderScreen;