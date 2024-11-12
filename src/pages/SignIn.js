import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [ConfirmApiKey, setConfirmApiKey] = useState(''); // 비밀번호 확인 입력
  const [isSignUp, setIsSignUp] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false); // 페이지 전환 상태
  const navigate = useNavigate();

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 회원가입 처리 함수
  const handleSignUp = () => {
    if (!validateEmail(email)) {
      toast.error('유효하지 않은 이메일 형식입니다.');
      return;
    }

    if (!apiKey) {
      toast.error('API 키를 입력해주세요.');
      return;
    }

    if (apiKey !== ConfirmApiKey) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 사용자 정보 저장 (로컬 스토리지)
    const userData = {
      email: email,
      apiKey: apiKey,
    };

    localStorage.setItem('user', JSON.stringify(userData));
    toast.success('회원가입이 완료되었습니다!');
    
    // 페이지 전환 애니메이션 적용 후 로그인 화면으로 전환
    setIsTransitioning(true);
    setTimeout(() => {
      setIsSignUp(false); 
      setIsTransitioning(false);
    }, 500); // 애니메이션 시간 설정 (0.5초)
  };

  // 로그인 처리 함수
  const handleLogin = async () => {
    try {
      // TMDB API 키 검증 (간단한 요청으로 검증)
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);

      if (response.status === 200) {
        // 로그인 성공
        localStorage.setItem('sessionId', apiKey); // 세션 저장
        toast.success('로그인 성공!');
        navigate('/'); // 메인 페이지로 리다이렉트
      }
    } catch (error) {
      toast.error('API 키가 유효하지 않습니다.');
    }
  };

  // 페이지 전환 버튼 클릭 시 애니메이션 적용
  const handlePageSwitch = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsSignUp(!isSignUp);
      setIsTransitioning(false);
    }, 500); // 애니메이션 시간 설정 (0.5초)
  };

  return (
    <div className={`signin ${isTransitioning ? 'transition' : ''}`}>
      <h1>{isSignUp ? '회원가입' : '로그인'}</h1>

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

      {/* 회원가입일 때만 확인 입력 필드를 보여줌 */}
      {isSignUp && (
        <input 
          type="text" 
          placeholder="TMDB API 키 확인" 
          value={ConfirmApiKey}
          onChange={(e) => setConfirmApiKey(e.target.value)} 
        />
      )}

      {isSignUp ? (
        <button onClick={handleSignUp}>
          회원가입
        </button>
      ) : (
        <button onClick={handleLogin}>
          로그인
        </button>
      )}

      <button onClick={handlePageSwitch}>
        {isSignUp ? '이미 계정이 있으신가요? 로그인' : "계정이 없으신가요? 회원가입"}
      </button>

      {/* Toast 알림 표시 */}
      <ToastContainer />
    </div>
  );
};

export default SignIn;