import React from 'react';
import './MovieListItem.css'; // 리스트 아이템 스타일 파일

const MovieListItem = ({ movie }) => {
  return (
    <div className="movie-list-item">
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieListItem;