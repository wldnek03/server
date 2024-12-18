import React, { useState, useEffect } from 'react';
import './MovieGrid.css';
import { 
  saveLikedMoviesToLocalStorage, 
  getLikedMoviesFromLocalStorage, 
  getUserFromLocalStorage 
} from '../utils/localStorage';

const MovieGrid = ({ movie }) => {
  const [liked, setLiked] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const currentUser = getUserFromLocalStorage();
    if (currentUser && currentUser.id) {
      setCurrentUserId(currentUser.id); // 사용자 ID 설정
      console.log('Current User ID:', currentUser.id); // 디버깅 로그
      const savedLikes = getLikedMoviesFromLocalStorage(currentUser.id);
      setLiked(savedLikes.some(savedMovie => savedMovie.id === movie.id));
    } else {
      console.warn('No logged-in user found'); // 디버깅 로그
    }
  }, [movie.id]);

  const handlePosterClick = () => {
    if (!currentUserId) {
      alert('로그인이 필요합니다.');
      return;
    }

    const savedLikes = getLikedMoviesFromLocalStorage(currentUserId);

    if (!savedLikes.some(savedMovie => savedMovie.id === movie.id)) {
      const updatedLikes = [...savedLikes, movie];
      saveLikedMoviesToLocalStorage(currentUserId, updatedLikes);
      setLiked(true);
    } else {
      const updatedLikes = savedLikes.filter(savedMovie => savedMovie.id !== movie.id);
      saveLikedMoviesToLocalStorage(currentUserId, updatedLikes);
      setLiked(false);
    }
  };

  return (
    <div className="movie-grid-item" onClick={handlePosterClick}>
      <div className="poster-container">
        <img 
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
          alt={movie.title} 
          className="poster-image"
        />
      </div>
      <h3>{movie.title}</h3>
      {liked && <span className="like-icon">❤️</span>}
    </div>
  );
};

export default MovieGrid;
