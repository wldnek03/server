import React from 'react';
import './MovieCard.css'; // 카드 개별 스타일

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img 
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
        alt={movie.title} 
      />
      <div className="movie-title">{movie.title}</div>
    </div>
  );
};

export default MovieCard;
