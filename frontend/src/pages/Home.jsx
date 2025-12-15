import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import { useRef } from "react";
import { BASE_URL } from "../apiConfig";


const Home = ({ freshCollectionRef }) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (window.location.hash === "#shop") {
          const element = document.getElementById("shop");
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: "smooth" });
            }, 100); // Small delay to ensure page loads
          }
        } else {
          window.scrollTo(0, 0); // Scroll to top if just "/"
        }
      
        const { data } = await axios.get(`${BASE_URL}/api/products`);
        
        // --- SORTING LOGIC ---
        // We define the custom order: Ghee first, then Milk, then Curd.
        const sortOrder = { "Ghee": 1, "Milk": 2, "Curd": 3, "Other": 4 };
        
        const sortedData = data.sort((a, b) => {
          // If a category isn't in our list, treat it as "Other"
          const rankA = sortOrder[a.category] || 99;
          const rankB = sortOrder[b.category] || 99;
          return rankA - rankB;
        });

        setProducts(sortedData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-dairy-cream">
      
      {/* ---------------- HERO SECTION ---------------- */}
      <div className="relative h-[500px] w-full bg-dairy-dark overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1635586506547-4dbe01d7ba5d?w=900&auto=format&fit=crop&q=60" 
          alt="Dairy Farm Banner" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg"
          >
            Pure. Fresh. <span className="text-dairy-gold">Organic.</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-2xl"
          >
            Direct from our farm to your family. No preservatives, just purity.
          </motion.p>
        </div>
      </div>

      {/* ---------------- PRODUCT GRID ---------------- */}
      <div 
        className="relative bg-fixed bg-center bg-cover py-16"
        
      >
        {/* Overlay to ensure text readability (90% Cream color) */}
        <div ref={freshCollectionRef} id="shop" className="absolute inset-0 bg-dairy-cream/30"></div>

        <div className="container mx-auto px-6 relative z-10">
          
          {/* CENTERED HEADER WITH ANIMATED UNDERLINE */}
          <div  className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-dairy-dark relative z-10">
              Our Fresh Collection
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "120px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-1 bg-dairy-gold mt-3 rounded-full"
            ></motion.div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dairy-gold"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10 bg-white rounded-lg shadow">{error}</div>
          ) : (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-[85rem] mx-auto">            
                 {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;