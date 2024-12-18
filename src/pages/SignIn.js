import React, { useEffect } from 'react';
import axios from 'axios';

const SignIn = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY; // .env 파일에 저장된 REST API 키
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI; // 카카오 개발자 콘솔에 등록한 Redirect URI

  // 카카오 로그인 버튼 클릭 시 호출
  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
    window.location.href = KAKAO_AUTH_URL;
  };
  
  // URL에서 인가 코드 추출 후 액세스 토큰 요청
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    if (authCode) {
      getAccessToken(authCode); // 인가 코드를 사용해 액세스 토큰 요청

      // URL에서 code 파라미터 제거 (인가 코드 재사용 방지)
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  // 액세스 토큰 요청 함수
  const getAccessToken = async (authCode) => {
    try {
      const TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
      const response = await axios.post(
        TOKEN_URL,
        null,
        {
          params: {
            grant_type: 'authorization_code',
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: authCode,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token } = response.data;
      localStorage.setItem('accessToken', access_token); // 액세스 토큰 저장
      await getUserInfo(access_token); // 사용자 정보 요청
    } catch (error) {
      console.error('액세스 토큰 요청 실패:', error.response?.data || error.message);
      alert(`로그인 실패: ${error.response?.data?.error_description || error.message}`);
    }
  };

  // 사용자 정보 요청 함수
  const getUserInfo = async (accessToken) => {
    try {
      const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { email, profile } = response.data.kakao_account;

      // 사용자 정보를 로컬 스토리지에 저장
      localStorage.setItem(
        'user',
        JSON.stringify({
          email,
          nickname: profile.nickname,
          profileImg: profile.profile_image_url,
        })
      );

      alert('카카오 로그인 성공!');
      window.location.replace('/'); // 메인 페이지로 리다이렉트
    } catch (error) {
      console.error('사용자 정보 요청 실패:', error.response?.data || error.message);
      alert(`사용자 정보 요청 실패: ${error.response?.data?.error_description || error.message}`);
    }
  };

  return (
    <div className="signin">
      <h1>로그인</h1>
      <button onClick={handleKakaoLogin} className="kakao-login-button">
        카카오톡으로 로그인
      </button>
    </div>
  );
};

export default SignIn;
