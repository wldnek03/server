import React, { useState } from 'react'; // useEffect 제거
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [liked, setLiked] = useState(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedMovies')) || [];
    return savedLikes.includes(movie.id);
  });

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
        <img 
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
          alt={movie.title} 
        />
        {liked && <span className="like-icon">❤️</span>}
      </div>
      <div className="movie-title">{movie.title}</div>
    </div>
  );
};

export default MovieCard;