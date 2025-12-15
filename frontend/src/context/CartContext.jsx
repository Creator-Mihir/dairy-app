import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. Initialize Cart
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Initialize Shipping Address (New)
  const [shippingAddress, setShippingAddress] = useState(() => {
    const savedAddress = localStorage.getItem("shippingAddress");
    return savedAddress ? JSON.parse(savedAddress) : {};
  });

  // Save Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save Address to LocalStorage (New)
  useEffect(() => {
    localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
  }, [shippingAddress]);

  // --- Actions ---

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existItem = prevItems.find((x) => x._id === product._id);
      if (existItem) {
        return prevItems.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        return [...prevItems, { ...product, qty: 1 }];
      }
    });
  };

  const decreaseQty = (product) => {
    setCartItems((prevItems) => {
      const existItem = prevItems.find((x) => x._id === product._id);
      if (existItem.qty === 1) {
        return prevItems.filter((x) => x._id !== product._id);
      } else {
        return prevItems.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty - 1 } : x
        );
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((x) => x._id !== id));
  };

  // New Function to Save Address
  const saveShippingAddress = (data) => {
    setShippingAddress(data);
  };

  // Clear Cart (Useful after order is placed)
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        decreaseQty, 
        removeFromCart,
        shippingAddress,       // <--- Exporting this
        saveShippingAddress,   // <--- Exporting this
        clearCart              // <--- Exporting this
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);