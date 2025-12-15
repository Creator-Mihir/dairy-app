import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductEdit = () => {
  const { id } = useParams(); // Get Product ID from URL
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    // Fetch current data to fill the form
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5001/api/products/${id}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setCategory(data.category);
        setStock(data.stock);
        setDescription(data.description);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // Send the updated data
      await axios.put(
        `http://localhost:5001/api/products/${id}`,
        { name, price, image, category, stock, description },
        config
      );

      navigate("/admin/products"); // Go back to list
    } catch (error) {
      alert("Error updating product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4 flex justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg border border-gray-100">
        <Link to="/admin/products" className="text-gray-500 hover:underline mb-6 inline-block">← Go Back</Link>
        
        <h1 className="text-2xl font-serif font-bold text-dairy-dark mb-6">Edit Product</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-dairy-gold" />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Price</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-dairy-gold" />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Image URL</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-dairy-gold" />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-dairy-gold" />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Stock Count</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-dairy-gold" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-dairy-gold"></textarea>
          </div>

          <button type="submit" className="w-full bg-dairy-dark text-white font-bold py-3 rounded-lg hover:bg-dairy-gold transition-colors">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;