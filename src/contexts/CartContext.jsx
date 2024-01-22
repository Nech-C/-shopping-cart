import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({}); // This will store the cart items as an object
  
    // Adds an item to the cart
    const addToCart = (id, quantity = 1) => {
      setCart((prevCart) => ({
        ...prevCart,
        [id]: (prevCart[id] || 0) + quantity,
      }));
      console.log(cart);
    };
  
    // Updates the item quantity
    const updateQuantity = (id, quantity) => {
      if (quantity <= 0) {
        const newCart = { ...cart };
        delete newCart[id];
        setCart(newCart);
      } else {
        setCart((prevCart) => ({
          ...prevCart,
          [id]: quantity,
        }));
      }
    };
  
    // Clears the entire cart
    const clearCart = () => {
      setCart({});
    };
  
    return (
      <CartContext.Provider value={{ cart, addToCart, updateQuantity, clearCart }}>
        {children}
      </CartContext.Provider>
    );
  };
  


export default CartContext;
