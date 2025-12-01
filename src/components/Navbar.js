import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBox, FaCog } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const { t } = useLanguage();
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          E-Shop
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">{t('home')}</Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">{t('products')}</Link>
          </li>
          <li className="nav-item">
            <Link to="/orders" className="nav-link">
              <FaBox /> {t('orders')}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-link">
              <FaCog />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link cart-link">
              <FaShoppingCart />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;