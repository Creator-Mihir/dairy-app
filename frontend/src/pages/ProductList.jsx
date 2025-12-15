import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:5001/api/products");
    setProducts(data);
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchProducts();
    } else {
      navigate("/");
    }
  }, [navigate]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        await axios.delete(`http://localhost:5001/api/products/${id}`, config);
        fetchProducts(); // Refresh list after delete
      } catch (error) {
        alert("Error deleting product");
      }
    }
  };

  const createHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        // 1. Create a "Sample Product"
        const { data } = await axios.post("http://localhost:5001/api/products", {}, config);
        
        // 2. Immediately take user to the Edit Page for that new product
        navigate(`/admin/product/${data._id}/edit`);
      } catch (error) {
        console.error(error);
        alert("Error creating product");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-dairy-dark">Products</h1>
          <button 
            onClick={createHandler}
            className="bg-dairy-gold text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-dairy-accent transition"
          >
            <FiPlus /> Create Product
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-dairy-dark text-white">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Category</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-500">{product._id.substring(0, 10)}...</td>
                  <td className="p-4 font-bold text-gray-700">{product.name}</td>
                  <td className="p-4">₹{product.price}</td>
                  <td className="p-4 text-sm text-gray-500">{product.category}</td>
                  <td className="p-4 flex gap-3">
                    <Link to={`/admin/product/${product._id}/edit`} className="text-blue-600 hover:text-blue-800">
                      <FiEdit size={20} />
                    </Link>
                    <button 
                      onClick={() => deleteHandler(product._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;