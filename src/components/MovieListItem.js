import React, { useState } from 'react';
import './MovieListItem.css'; // 리스트 아이템 스타일 파일

const MovieListItem = ({ movie, onPosterClick = () => {} }) => {
  // localStorage에서 좋아요 상태 불러오기
  const [liked, setLiked] = useState(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedMovies')) || [];
    return savedLikes.includes(movie.id); // 영화 ID가 localStorage에 있는지 확인
  });

  // 포스터 클릭 시 좋아요 상태 업데이트
  const handlePosterClick = () => {
    const savedLikes = JSON.parse(localStorage.getItem('likedMovies')) || [];

    if (!savedLikes.includes(movie.id)) {
      // 좋아요 추가
      const updatedLikes = [...savedLikes, movie.id];
      localStorage.setItem('likedMovies', JSON.stringify(updatedLikes));
      setLiked(true);
    } else {
      // 좋아요 취소 (optional)
      const updatedLikes = savedLikes.filter(id => id !== movie.id);
      localStorage.setItem('likedMovies', JSON.stringify(updatedLikes));
      setLiked(false);
    }

    // 부모 컴포넌트로 클릭 이벤트 전달 (onPosterClick이 없으면 빈 함수 실행)
    onPosterClick(movie);
  };

  // 포스터 경로가 없을 경우 대체 이미지 사용
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Image';

  return (
    <div className="movie-list-item" onClick={handlePosterClick}>
      <img src={posterUrl} alt={movie.title} />
      <h3>{movie.title}</h3>
      {/* liked 값에 따라 하트 아이콘 표시 */}
      {liked && <span className="like-icon">❤️</span>}
    </div>
  );
};

export default MovieListItem;