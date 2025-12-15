import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; 
import axios from "axios";

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5001/api/products/${id}`);
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `http://localhost:5001/api/products/${id}/reviews`,
        { rating, comment },
        config
      );

      alert("Review Submitted!");
      setRating(0);
      setComment("");
      fetchProduct();
    } catch (error) {
      alert(error.response?.data?.message || "Error submitting review");
    }
  };

  const addToCartHandler = () => {
     navigate(`/cart/${id}?qty=${qty}`);
  };

  if (loading) return <div className="pt-32 text-center font-bold text-xl">Loading...</div>;

  return (
    <div className="pt-28 pb-12 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="text-gray-500 hover:underline mb-6 inline-block">← Back to Shop</Link>
        
        {/* --- PRODUCT DETAILS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <img src={product.image} alt={product.name} className="w-full rounded-xl shadow-lg" />
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-dairy-dark">{product.name}</h1>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            <p className="text-2xl font-bold text-dairy-gold">₹{product.price}</p>
            <p className="text-gray-600">{product.description}</p>
            
            <div className="border-t border-b py-4 my-4 space-y-3">
              <div className="flex justify-between">
                <span>Status:</span>
                <span className={product.stock > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              
              {product.stock > 0 && (
                <div className="flex justify-between items-center">
                  <span>Qty:</span>
                  <select 
                    value={qty} 
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="border p-2 rounded"
                  >
                    {[...Array(product.stock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <button 
                onClick={addToCartHandler}
                disabled={product.stock === 0}
                className="w-full bg-dairy-dark text-white py-3 rounded-lg font-bold hover:bg-dairy-accent transition disabled:bg-gray-300"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>

        {/* --- REVIEWS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-dairy-dark mb-4">Reviews</h2>
            {product.reviews && product.reviews.length === 0 && <div className="bg-blue-50 p-4 text-blue-800 rounded">No reviews yet. Be the first!</div>}
            
            <div className="space-y-4">
              {product.reviews && product.reviews.map((review) => (
                <div key={review._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex justify-between mb-2">
                    <strong className="text-dairy-dark">{review.name}</strong>
                    <Rating value={review.rating} />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dairy-dark mb-4">Write a Review</h2>
            {userInfo ? (
              <form onSubmit={submitReviewHandler} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="mb-4">
                  <label className="block font-bold mb-2">Rating</label>
                  <select 
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-dairy-gold"
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block font-bold mb-2">Comment</label>
                  <textarea 
                    rows="3" 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-dairy-gold"
                  ></textarea>
                </div>

                <button type="submit" className="bg-dairy-gold text-white px-6 py-2 rounded font-bold hover:bg-dairy-accent transition">
                  Submit Review
                </button>
              </form>
            ) : (
              <div className="bg-yellow-50 p-4 text-yellow-800 rounded border border-yellow-200">
                Please <Link to="/login" className="font-bold underline">sign in</Link> to write a review.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;