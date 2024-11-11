import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../services/api'; // API 호출 함수
import HomeCard from '../components/HomeCard'; // 영화 카드 컴포넌트
import Header from '../components/Header'; // 헤더 컴포넌트
import './Home.css';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]); // 최고 평점 영화 상태
  const [actionMovies, setActionMovies] = useState([]); // 액션 영화 상태
  const [comedyMovies, setComedyMovies] = useState([]); // 코미디 영화 상태

  // API 호출: 인기 영화, 최신 영화, 최고 평점 영화, 액션 영화, 코미디 영화를 각각 가져옴
  useEffect(() => {
    const getPopularMovies = async () => {
      const data = await fetchMovies('/movie/popular'); // 인기 영화 API 요청
      setPopularMovies(data.results);
    };

    const getLatestMovies = async () => {
      const data = await fetchMovies('/movie/upcoming'); // 최신 영화 API 요청
      setLatestMovies(data.results);
    };

    const getTopRatedMovies = async () => {
      const data = await fetchMovies('/movie/top_rated'); // 최고 평점 영화 API 요청
      setTopRatedMovies(data.results);
    };

    const getActionMovies = async () => {
      const data = await fetchMovies('/discover/movie?with_genres=28'); // 액션 장르 (장르 ID: 28)
      setActionMovies(data.results);
    };

    const getComedyMovies = async () => {
      const data = await fetchMovies('/discover/movie?with_genres=35'); // 코미디 장르 (장르 ID: 35)
      setComedyMovies(data.results);
    };

    getPopularMovies();
    getLatestMovies();
    getTopRatedMovies();
    getActionMovies();
    getComedyMovies();
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

      {/* 최고 평점 영화 섹션 */}
      <div className="section-title">
        <h1>최고 평점 영화</h1>
      </div>
      <div className="movie-section">
        <button className="scroll-btn left" onClick={() => scrollLeft('topRated')}>◀</button>
        <div id="topRated" className="movie-row">
          {topRatedMovies.length > 0 ? (
            topRatedMovies.map((movie) => <HomeCard key={movie.id} movie={movie} />)
          ) : (
            <p>No top-rated movies to display</p>
          )}
        </div>
        <button className="scroll-btn right" onClick={() => scrollRight('topRated')}>▶</button>
      </div>

      {/* 액션 영화 섹션 */}
      <div className="section-title">
        <h1>액션 영화</h1>
      </div>
      <div className="movie-section">
        <button className="scroll-btn left" onClick={() => scrollLeft('action')}>◀</button>
        <div id="action" className="movie-row">
          {actionMovies.length > 0 ? (
            actionMovies.map((movie) => <HomeCard key={movie.id} movie={movie} />)
          ) : (
            <p>No action movies to display</p>
          )}
        </div>
        <button className="scroll-btn right" onClick={() => scrollRight('action')}>▶</button>
      </div>

      {/* 코미디 영화 섹션 */}
      <div className="section-title">
        <h1>코미디 영화</h1>
      </div>
      <div className="movie-section">
        <button className="scroll-btn left" onClick={() => scrollLeft('comedy')}>◀</button>
        <div id="comedy" className="movie-row">
          {comedyMovies.length > 0 ? (
            comedyMovies.map((movie) => <HomeCard key={movie.id} movie={movie} />)
          ) : (
            <p>No comedy movies to display</p>
          )}
        </div>
        <button className="scroll-btn right" onClick={() => scrollRight('comedy')}>▶</button>
      </div>

    </div>
  );
};

export default Home;
