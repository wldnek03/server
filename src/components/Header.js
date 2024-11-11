import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa'; // Font Awesome의 사람 아이콘 가져오기
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [username, setUsername] = useState(''); // 사용자 이름 (로그인 시 표시)

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // 로그아웃 처리
      setIsLoggedIn(false);
      setUsername('');
    } else {
      // 로그인 처리 (임시로 사용자 이름 설정)
      setIsLoggedIn(true);
      setUsername('JooUser');
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🎬 Joo movie</Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/popular">Popular</Link>
        <Link to="/search">Search</Link>
        <Link to="/wishlist">Wishlist</Link>
        {isLoggedIn ? (
          <>
            <span className="username">{username}</span> {/* 사용자 이름 표시 */}
            <button onClick={handleLoginLogout} className="auth-button">
              Logout
            </button>
          </>
        ) : (
          <button onClick={handleLoginLogout} className="auth-button">
            <FaUser /> Sign In
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
