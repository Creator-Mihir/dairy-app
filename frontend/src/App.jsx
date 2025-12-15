import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import PlaceOrder from "./pages/PlaceOrder";
import Profile from "./pages/Profile";
import AdminOrders from "./pages/AdminOrders";
import OrderScreen from "./pages/OrderScreen";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";
import ProductScreen from "./pages/ProductScreen";
import OurFarm from "./pages/OurFarm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const freshCollectionRef = useRef(null);

  const scrollToFreshCollection = () => {
    freshCollectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Router>
      <ScrollToTop />

      {/* Navbar always visible */}
      <Navbar onShopClick={scrollToFreshCollection} />

      <Routes>
        <Route
          path="/"
          element={<Home freshCollectionRef={freshCollectionRef} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/our-farm" element={<OurFarm />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
