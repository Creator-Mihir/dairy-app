import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import Eye Icons
import { BASE_URL } from "../apiConfig";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* ---------------- LEFT SIDE: LOGIN FORM ---------------- */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 relative z-10">
        
        {/* Animated Form Container */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Brand Logo (Small) */}
          <div className="mb-8 flex items-center gap-2">
            <span className="text-3xl">🥛</span>
            <span className="text-2xl font-serif font-bold text-dairy-dark">
              <span className="text-dairy-gold">Pure</span>Dairy
            </span>
          </div>

          <h2 className="text-4xl font-serif font-bold text-dairy-dark mb-3">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-8">
            Please enter your details to sign in.
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-6 border border-red-100"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-dairy-gold focus:ring-1 focus:ring-dairy-gold transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Field with Eye Icon */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-dairy-gold focus:ring-1 focus:ring-dairy-gold transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-dairy-gold transition-colors focus:outline-none"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-dairy-gold text-white py-3 rounded-lg hover:bg-dairy-accent transition duration-300 font-bold shadow-md text-lg mt-4"
            >
              Sign In
            </motion.button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-dairy-gold font-bold hover:underline">
              Create one now
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ---------------- RIGHT SIDE: PREMIUM IMAGE ---------------- */}
      <div className="hidden md:block w-1/2 relative bg-dairy-dark">
        {/* Background Image (Milk Splash) */}
        <motion.img 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1920&auto=format&fit=crop" 
          alt="Premium Dairy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Floating Text on Image */}
        <div className="absolute bottom-16 left-12 text-white max-w-lg">
          <motion.h3 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5, duration: 0.8 }}
             className="text-4xl font-serif font-bold mb-4 leading-tight"
          >
            Purity You Can Taste, <br/> Quality You Can Trust.
          </motion.h3>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.8 }}
             transition={{ delay: 0.8, duration: 0.8 }}
             className="text-lg text-gray-200"
          >
            Join thousands of happy families enjoying farm-fresh dairy delivered daily.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Login;