// src/components/Cart.js
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CartContext from '../contexts/CartContext';
import { getGameDetails } from "../../lib/api"; // Assuming this function exists
import "../styles/Cart.css";

function Cart() {
    const { cart, updateQuantity, clearCart } = useContext(CartContext);
    const [cartItemsDetails, setCartItemsDetails] = useState([]);

    // Load additional game details like name and image for each item in the cart
    useEffect(() => {
        async function fetchGameDetails() {
            const detailedItems = await Promise.all(
                Object.entries(cart).map(async ([gameID, quantity]) => {
                    const details = await getGameDetails(gameID);
                    return { gameID, quantity, details };
                })
            );
            
            console.log(detailedItems);
            setCartItemsDetails(detailedItems);
        }

        fetchGameDetails();
    }, [cart]);

    const handleRemoveFromCart = (gameID) => {
        updateQuantity(gameID, 0); // Set quantity to 0 to remove from cart
    };

    const handleQuantityChange = (gameID, amount) => {
        if (!cart[gameID]) return; // If the item is not in the cart, do nothing
        const newQuantity = cart[gameID] + amount;
        updateQuantity(gameID, newQuantity);
    };

    const calculateTotal = () => {
        return cartItemsDetails.reduce((total, item) => {
            return total + (item.details.price * item.quantity);
        }, 0);
    };

    return (
        <div className="cart-page">
            <h2>Your Shopping Cart</h2>
            <div className="cart-items">
                {
                cartItemsDetails.map(item => (
                    <div className="cart-item" key={item.gameID}>
                        <img src={item.details.background_image} alt={item.details.name} />
                        <div className="cart-item-details">
                            <h3>{item.details.name}</h3>
                            <p>${item.details.price}</p>
                            <div className="quantity-controls">
                                <button onClick={() => handleQuantityChange(item.gameID, -1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item.gameID, 1)}>+</button>
                            </div>
                            <button onClick={() => handleRemoveFromCart(item.gameID)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-total">
                <strong>Total Cost:</strong> ${calculateTotal()}
                <button onClick={clearCart}>Clear Cart</button>
            </div>
        </div>
    );
}

export default Cart;
