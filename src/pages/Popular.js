// Popular.js
import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../services/api';  // fetchMovies가 정상적으로 import 되는지 확인
import MovieCard from '../components/MovieCard';
import Header from '../components/Header';
import './Popular.css';  // CSS 파일 불러오기

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies('/movie/popular');  // 영화 목록 요청
        console.log(data);  // API 데이터 확인
        setMovies(data.results || []);  // 데이터 결과를 movies 상태에 저장
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        setMovies([]);  // 오류 발생 시 빈 배열 설정
      } finally {
        setLoading(false);  // 로딩 종료
      }
    };
    getMovies();
  }, []);  // 컴포넌트가 처음 마운트될 때만 실행

  if (loading) {
    return (
      <div className="popular">
        <Header />
        <h1 className="text-white">Popular Movies</h1>  {/* 흰색 텍스트 */}
        <p className="text-white">Loading movies...</p>  {/* 로딩 텍스트 */}
      </div>
    );
  }

  return (
    <div className="popular">
      <Header />
      <h1 className="text-white">Popular Movies</h1>  
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-white">No popular movies available</p> 
        )}
      </div>
    </div>
  );
};

export default Popular;
