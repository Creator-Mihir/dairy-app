import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { BASE_URL } from "../apiConfig";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1. Basic Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // 2. Register the user
      const { data } = await axios.post(`${BASE_URL}/api/auth/signup`, {
        name,
        email,
        password,
      });

      // 3. Auto-login (Save token)
      localStorage.setItem("userInfo", JSON.stringify(data));
      
      // 4. Redirect to Home
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* ---------------- LEFT SIDE: FORM ---------------- */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="mb-6 flex items-center gap-2">
            <span className="text-3xl">🥛</span>
            <span className="text-2xl font-serif font-bold text-dairy-dark">
              <span className="text-dairy-gold">Pure</span>Dairy
            </span>
          </div>

          <h2 className="text-3xl font-serif font-bold text-dairy-dark mb-2">
            Join the Family
          </h2>
          <p className="text-gray-500 mb-6">Create an account for fresh deliveries.</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-6 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-dairy-gold focus:ring-1 focus:ring-dairy-gold"
                placeholder="Mihir Rawat"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-dairy-gold focus:ring-1 focus:ring-dairy-gold"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-dairy-gold focus:ring-1 focus:ring-dairy-gold"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-dairy-gold focus:outline-none"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

             {/* Confirm Password Field */}
             <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-dairy-gold focus:ring-1 focus:ring-dairy-gold"
                placeholder="Repeat password"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-dairy-gold text-white py-3 rounded-lg hover:bg-dairy-accent transition duration-300 font-bold shadow-md mt-2"
            >
              Sign Up
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-dairy-gold font-bold hover:underline">
              Log in here
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ---------------- RIGHT SIDE: IMAGE ---------------- */}
      <div className="hidden md:block w-1/2 relative bg-dairy-dark">
        <motion.img 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          // Using the "Golden Hour Farm" image here
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=1920&auto=format&fit=crop"
          alt="Dairy Farm"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        <div className="absolute bottom-16 left-12 text-white max-w-lg">
          <motion.h3 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5, duration: 0.8 }}
             className="text-4xl font-serif font-bold mb-4"
          >
            From Our Farm <br/> To Your Table.
          </motion.h3>
        </div>
      </div>
    </div>
  );
};

export default Signup;