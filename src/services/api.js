import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

// 기본 파라미터 설정
const defaultParams = {
  language: 'ko-KR',
};

/**
 * fetchMovies 함수
 * @param {string} endpoint - API 요청의 엔드포인트
 * @param {object} params - 추가적인 쿼리 파라미터
 * @returns {object} - 응답 데이터
 */
export const fetchMovies = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: { ...defaultParams, ...params },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return { results: [] }; // 기본적으로 빈 배열 반환
  }
};
