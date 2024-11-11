import React, { useState } from 'react';
import './HomeCard.css';

const HomeCard = ({ movie }) => {
  // 좋아요 상태 관리
  const [liked, setLiked] = useState(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedMovies')) || [];
    return savedLikes.includes(movie.id);
  });

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = () => {
    const savedLikes = JSON.parse(localStorage.getItem('likedMovies')) || [];

    if (!savedLikes.includes(movie.id)) {
      const updatedLikes = [...savedLikes, movie.id];
      localStorage.setItem('likedMovies', JSON.stringify(updatedLikes));
      setLiked(true);
    } else {
      const updatedLikes = savedLikes.filter(id => id !== movie.id);
      localStorage.setItem('likedMovies', JSON.stringify(updatedLikes));
      setLiked(false);
    }
  };

  return (
    <div className="movie-card" onClick={handleLikeClick}>
      <div className="poster-container">
        {/* 포스터 이미지 */}
        <img 
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
          alt= {movie.title}
        />
        {/* 좋아요 아이콘 */}
        <h3 className="movie-title">{movie.title}</h3>
        {liked && <span className="like-icon">❤️</span>}
      </div>
    </div>
  );
};

export default HomeCard;