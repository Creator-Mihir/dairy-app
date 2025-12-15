import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const Navbar = ({ onShopClick }) => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  
  // Get user data
  const user = JSON.parse(localStorage.getItem("userInfo"));

  // Effect to detect scrolling (to make navbar solid when scrolling)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg-black/40 backdrop-blur-md shadow-md py-3" // Scrolled State (Glass)
            : "bg-black/60 py-5" // Top State (Transparent)
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* 1. LOGO */}
          <Link to="/" className="text-2xl font-serif font-bold flex items-center gap-2 group">
            <span className="text-3xl group-hover:scale-110 transition-transform">🥛</span>
            <span className={`transition-colors ${scrolled ? "text-dairy-dark" : "text-white"}`}>
              <span className="text-dairy-gold">Gurjar's </span>Dairy
            </span>
          </Link>

          {/* 2. DESKTOP LINKS (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-8 font-medium">
            <Link 
              to="/" 
              className={`hover:text-dairy-gold transition-colors ${scrolled ? "text-gray-600" : "text-gray-200"}`}
            >
              Home
            </Link>
            <button
                onClick={onShopClick}
                className={`hover:text-dairy-gold transition-colors ${
                  scrolled ? "text-gray-600" : "text-gray-200"
                }`}
              >
                Shop
              </button>
            <Link 
              to="/our-farm" 
              className={`hover:text-dairy-gold transition-colors ${scrolled ? "text-gray-600" : "text-gray-200"}`}
            >
              Our Farm 🌿
            </Link>
          </div>

          {/* 3. ICONS & BUTTONS */}
          <div className="hidden md:flex items-center gap-5">
            {user ? (
              <>
                {/* Link to Profile Page */}
                <Link 
                  to="/profile" 
                  className={`text-sm font-semibold hover:text-dairy-gold transition-colors ${scrolled ? "text-dairy-dark" : "text-white"}`}
                >
                  Hi, {user.name.split(" ")[0]}

                </Link>
                {/* ADMIN LINK - Only visible if isAdmin is true */}
                {user && user.isAdmin && (
                      <Link 
                        to="/admin/orders" 
                        className={`font-bold hover:text-dairy-gold transition-colors ${scrolled ? "text-dairy-dark" : "text-white"}`}
                      >
                        Dashboard ⚡
                      </Link>
                    )}

                    {user && user.isAdmin && (
                      <>

                        {/* New Link */}
                        <Link to="/admin/products" className={`font-bold hover:text-dairy-gold transition-colors ml-4 ${scrolled ? "text-dairy-dark" : "text-white"}`}>
                          Products 🥛
                        </Link>
                      </>
                    )}

                    {/* ... existing Cart Link ... */}
                                    
                {/* Cart Icon */}
                <Link to="/cart" className="relative group">
                  <FiShoppingBag 
                    size={22} 
                    
                    className={`transition-colors ${scrolled ? "text-dairy-dark hover:text-dairy-gold" : "text-white hover:text-dairy-gold"}`} 
                  />
                  {/* Cart Badge (Hardcoded for now) */}
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-dairy-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>

                {/* Logout Button */}
                <button 
                  onClick={handleLogout}
                  className="bg-dairy-gold text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-dairy-accent transition-all shadow-md active:scale-95"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-4">
                <Link to="/login" className={`font-medium hover:text-dairy-gold ${scrolled ? "text-dairy-dark" : "text-white"}`}>
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-dairy-gold text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-dairy-accent transition-all shadow-lg hover:shadow-xl"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button 
            className="md:hidden text-dairy-gold"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FiMenu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            <button 
              className="absolute top-6 right-6 text-gray-500 hover:text-red-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiX size={32} />
            </button>

            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-dairy-dark hover:text-dairy-gold">Home</Link>
            <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-dairy-dark hover:text-dairy-gold">Shop</Link>
            <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-dairy-dark hover:text-dairy-gold">Cart</Link>
            
            {user ? (
               <button onClick={() => {handleLogout(); setMobileMenuOpen(false)}} className="text-xl text-red-500 font-bold">Logout</button>
            ) : (
               <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-xl text-dairy-gold font-bold">Login / Signup</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;