import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import {  useNavigate, useLocation } from "react-router-dom"; // <--- Import Hooks
const Footer = () => {
  const handleNav = (target) => {
    if (target === "home") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
    } else if (target === "shop") {
      if (location.pathname === "/") {
        // If already on Home, just find the ID and scroll
        const element = document.getElementById("shop");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      } else {
        // If on another page, go to Home with #shop hash
        navigate("/#shop");
      }
    }
  };
  return (
    <footer className="bg-dairy-dark text-gray-300 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-6">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & About */}
          <div>
            <Link to="/" className="text-2xl font-serif font-bold flex items-center gap-2 mb-6">
              <span className="text-3xl">🐄</span>
              <span className="text-white">
                <span className="text-dairy-gold">Gurjar's</span>Dairy
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              Delivering fresh, organic, and unadulterated dairy products straight from our farm to your family's table. Purity you can taste.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-dairy-gold transition-colors"><FiInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-dairy-gold transition-colors"><FiTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-dairy-gold transition-colors"><FiFacebook size={20} /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-dairy-gold font-bold text-lg mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><button 
                onClick={() => handleNav("home")} 
                className="hover:text-dairy-gold transition-colors text-left"
              >
                Home
              </button></li>
              <li><button 
                onClick={() => handleNav("shop")} 
                className="hover:text-dairy-gold transition-colors text-left"
              >
                Our Shop
              </button></li>
              <li><Link to="/our-farm" className="hover:text-white transition-colors">About the Farm</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-dairy-gold font-bold text-lg mb-6 tracking-wide">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-dairy-gold mt-1" />
                <span>Rawat Krishi Farms, Vill-Kasli  <br/>,Sikar Rajasthan India 332002</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-dairy-gold" />
                <span>+91 9571927107</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-dairy-gold" />
                <span>hello@gurjar'sdairy.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-dairy-gold font-bold text-lg mb-6 tracking-wide">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe for farm updates and exclusive offers.</p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-dairy-gold transition-colors"
              />
              <button className="bg-dairy-gold text-white text-sm font-bold py-3 rounded-lg hover:bg-dairy-accent transition-colors">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Gurjar's Dairy. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="hover:text-white">Privacy Policy</Link>
            <Link to="/" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;