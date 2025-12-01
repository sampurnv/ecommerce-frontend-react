import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import LiveChat from './components/LiveChat';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Settings from './components/Settings';
import './App.css';
import './styles/darkmode.css';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [userId] = useState(1); // Simulated logged-in user

  return (
    <ThemeProvider>
      <LanguageProvider>
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
              <Route path="/settings" element={<Settings />} />
            </Routes>
            <LiveChat />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;