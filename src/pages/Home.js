import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies('/movie/now_playing'); // API 요청
      setMovies(data.results);
    };
    getMovies();
  }, []);

  return (
    <div className="home">
      <Header /> {/* 여기에 Header 추가 */}
      <h1>Now Playing</h1>
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No movies to display</p> // movies가 비었을 경우
        )}
      </div>
    </div>
  );
};

export default Home;
