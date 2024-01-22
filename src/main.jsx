import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Router from "./Router.jsx";
import './index.css'
import { CartProvider } from './contexts/CartContext'; // Import CartProvider




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <Router />
    </CartProvider>
  </React.StrictMode>
);
