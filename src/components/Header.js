import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './Header.css';
import axios from 'axios';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [username, setUsername] = useState(''); // 사용자 이름 (로그인 시 표시)
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 사용자 정보 가져오기
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // 로컬 스토리지에서 사용자 정보 가져오기
    if (storedUser && storedUser.nickname) {
      setIsLoggedIn(true);
      setUsername(storedUser.nickname); // 닉네임 표시
    }
  }, []); 

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        // 카카오 로그아웃 API 호출
        await axios.post(
          'https://kapi.kakao.com/v1/user/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }
  
      // 로컬 스토리지 초기화
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      setIsLoggedIn(false);
      setUsername('');
      navigate('/'); // 홈으로 리다이렉트
  
      alert('로그아웃 되었습니다.');
    } catch (error) {
      console.error('로그아웃 실패:', error.response?.data || error.message);
      alert('로그아웃 중 문제가 발생했습니다.');
    }
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
            <span className="username">{username}</span> {/* 사용자 이름(닉네임) 표시 */}
            <button onClick={handleLogout} className="auth-button">
              로그아웃
            </button>
          </>
        ) : (
          <button onClick={() => navigate('/oauth/callback')} className="auth-button">
            <FaUser /> 로그인
          </button>
        )}
        
      </nav>
    </header>
  );
};

export default Header;
