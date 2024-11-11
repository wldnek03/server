import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa'; // Font Awesome의 사람 아이콘 가져오기
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
      <Link to="/signin">
        <FaUser /> {/* 사람 아이콘 추가 */}
      </Link>
    </nav>
  </header>
);

export default Header;