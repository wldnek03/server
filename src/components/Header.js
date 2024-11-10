import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="header">
    <div className="logo">
      <Link to="/">🎬 Joo movie</Link>
    </div>
    <nav>
      <Link to="/popular">Popular</Link>
      <Link to="/search">Search</Link>
      <Link to="/wishlist">Wishlist</Link>
      <Link to="/signin">Sign In</Link>
    </nav>
  </header>
);

export default Header;
