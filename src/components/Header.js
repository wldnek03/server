import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); 

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 사용자 정보 가져오기
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('currentUser')); 

    if (savedUser && savedUser.nickname) {
      setIsLoggedIn(true);
      setUsername(savedUser.nickname); // 닉네임 설정
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('currentUser'); 
    localStorage.removeItem('accessToken'); 
    navigate('/'); // 홈으로 리다이렉트
    
    alert('로그아웃 되었습니다.');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🎬 Joo 영화</Link>
      </div>
      
      <nav className="nav-links">
        <Link to="/">홈</Link>
        <Link to="/popular">인기작</Link>
        <Link to="/search">검색</Link>
        <Link to="/wishlist">위시리스트</Link>
        
        {isLoggedIn ? (
          <>
            <span className="username">{username}</span> 
            <button onClick={handleLogout} className="auth-button">
              로그아웃
            </button>
          </>
        ) : (
          <Link to="/oauth/callback" className="auth-button">
            <FaUser /> 로그인
          </Link>
        )}
        
      </nav>
    </header>
  );
};

export default Header;
