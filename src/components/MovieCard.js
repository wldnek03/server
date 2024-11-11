import React, { useState } from 'react';
import './MovieCard.css'; // 스타일 파일

const MovieCard = ({ movie, onToggleWishlist }) => {
  const [liked, setLiked] = useState(false); // 좋아요 상태 관리

  // 포스터 클릭 시 좋아요 상태 토글 및 부모 컴포넌트로 영화 정보 전달
  const handleLikeClick = () => {
    console.log('Poster clicked!'); // 클릭 이벤트 발생 여부 체크
    setLiked(!liked); // liked 상태를 토글

    // onToggleWishlist가 함수인지 확인 후 호출
    if (typeof onToggleWishlist === 'function') {
      console.log('Calling onToggleWishlist with movie:', movie);
      onToggleWishlist(movie); // 부모 컴포넌트의 함수 호출
    } else {
      console.error('onToggleWishlist is not a function');
    }
  };

  return (
    <div className="movie-card" onClick={handleLikeClick}>
      <div className="poster-container">
        <img 
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
          alt={movie.title} 
        />
        {liked && <span className="like-icon">❤️</span>} {/* liked 상태가 true일 때 하트 표시 */}
      </div>
      <div className="movie-title">{movie.title}</div>
    </div>
  );
};

export default MovieCard;