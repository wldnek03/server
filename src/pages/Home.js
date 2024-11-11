import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../services/api'; // API 호출 함수
import HomeCard from '../components/HomeCard'; // 영화 카드 컴포넌트
import Header from '../components/Header'; // 헤더 컴포넌트
import './Home.css';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);

  // API 호출: 인기 영화와 최신 영화를 각각 가져옴
  useEffect(() => {
    const getPopularMovies = async () => {
      const data = await fetchMovies('/movie/popular'); // 인기 영화 API 요청
      setPopularMovies(data.results);
    };

    const getLatestMovies = async () => {
      const data = await fetchMovies('/movie/now_playing'); // 최신 영화 API 요청
      setLatestMovies(data.results);
    };

    getPopularMovies();
    getLatestMovies();
  }, []);

  // 가로 스크롤을 위한 핸들러 함수
  const scrollLeft = (id) => {
    document.getElementById(id).scrollLeft -= 300;
  };

  const scrollRight = (id) => {
    document.getElementById(id).scrollLeft += 300;
  };

  return (
    <div className="home">
      <Header /> {/* 헤더 추가 */}
      
      {/* 인기 영화 섹션 */}
      <div className="section-title">
        <h1>인기 영화</h1>
      </div>
      <div className="movie-section">
        <button className="scroll-btn left" onClick={() => scrollLeft('popular')}>◀</button>
        <div id="popular" className="movie-row">
          {popularMovies.length > 0 ? (
            popularMovies.map((movie) => <HomeCard key={movie.id} movie={movie} />)
          ) : (
            <p>No popular movies to display</p>
          )}
        </div>
        <button className="scroll-btn right" onClick={() => scrollRight('popular')}>▶</button>
      </div>

      {/* 최신 영화 섹션 */}
      <div className="section-title">
        <h1>최신 영화</h1>
      </div>
      <div className="movie-section">
        <button className="scroll-btn left" onClick={() => scrollLeft('latest')}>◀</button>
        <div id="latest" className="movie-row">
          {latestMovies.length > 0 ? (
            latestMovies.map((movie) => <HomeCard key={movie.id} movie={movie} />)
          ) : (
            <p>No latest movies to display</p>
          )}
        </div>
        <button className="scroll-btn right" onClick={() => scrollRight('latest')}>▶</button>
      </div>
    </div>
  );
};

export default Home;
