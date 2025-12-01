import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [userId] = useState(1); // Simulated logged-in user

  return (
    <Router>
      <div className="App">
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail userId={userId} setCartCount={setCartCount} />} />
          <Route path="/cart" element={<Cart userId={userId} setCartCount={setCartCount} />} />
          <Route path="/checkout" element={<Checkout userId={userId} />} />
          <Route path="/orders" element={<Orders userId={userId} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;