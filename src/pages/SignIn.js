import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // TMDB API 키 유효성 검사 함수
  const validateApiKey = (apiKey) => {
    return apiKey.length === 32; // TMDB API 키는 보통 32자입니다.
  };

  // 로그인 처리 함수
  const handleLogin = async () => {
    if (!validateEmail(email)) {
      alert('유효하지 않은 이메일 형식입니다.');
      return;
    }

    if (!validateApiKey(apiKey)) {
      alert('유효하지 않은 API 키 형식입니다.');
      return;
    }

    try {
      // API 요청을 통해 TMDB 서비스에 접근
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);

      // API 요청이 성공하면 로그인 성공 처리
      if (response.status === 200) {
        localStorage.setItem('sessionId', apiKey); // 세션 저장

        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email); // 이메일 저장
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        alert('로그인 성공!');
        onLoginSuccess(email);
        navigate('/'); // 메인 페이지로 리다이렉트
      } else {
        alert(`API 응답 오류: ${response.status}`);
      }
      
    } catch (error) {
      console.error("API 요청 중 오류:", error.response ? error.response.data : error.message);
      
      if (error.response && error.response.data && error.response.data.status_message) {
        alert(`API 요청 중 오류: ${error.response.data.status_message}`);
      } else {
        alert('API 요청 중 오류가 발생했습니다.');
      }
    }
  };

  // 회원가입 페이지로 이동하는 함수
  const handleSignUp = () => {
    navigate('/signup'); // 회원가입 페이지로 리다이렉트
  };

  return (
    <div>
      <h1>로그인</h1>
      <input 
        type="email" 
        placeholder="이메일" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
      />
      
      <input 
        type="text" 
        placeholder="TMDB API 키" 
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)} 
      />

      <div>
        <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
        <label htmlFor="rememberMe">아이디 기억하기</label>
      </div>

      <button onClick={handleLogin}>
        로그인
      </button>

      {/* 회원가입 버튼 추가 */}
      <button onClick={handleSignUp} style={{ marginLeft: '10px' }}>
        회원가입
      </button>
    </div>
  );
};

export default SignIn;