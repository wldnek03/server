import React, { useState, useEffect } from 'react';
import './MovieListItem.css'; // 스타일 파일
import { 
  saveLikedMoviesToLocalStorage, 
  getLikedMoviesFromLocalStorage, 
  getUserFromLocalStorage 
} from '../utils/localStorage'; // 로컬 스토리지 함수 임포트

const MovieListItem = ({ movie }) => {
  const [liked, setLiked] = useState(false); // 좋아요 상태
  const [currentUserId, setCurrentUserId] = useState(null); // 현재 로그인된 사용자 ID

  // 컴포넌트 마운트 시 현재 로그인된 사용자 정보 가져오기
  useEffect(() => {
    const currentUser = getUserFromLocalStorage(); // 현재 사용자 정보 가져오기
    if (currentUser && currentUser.id) {
      setCurrentUserId(currentUser.id); // 사용자 ID 설정
      const savedLikes = getLikedMoviesFromLocalStorage(currentUser.id); // 사용자별 좋아요 목록 가져오기
      setLiked(savedLikes.some(savedMovie => savedMovie.id === movie.id)); // 영화 ID로 좋아요 상태 확인
    }
  }, [movie.id]);

  // 포스터 클릭 시 좋아요 상태 업데이트
  const handlePosterClick = () => {
    if (!currentUserId) {
      alert('로그인이 필요합니다.'); // 로그인되지 않은 경우 경고 메시지 표시
      return;
    }

    const savedLikes = getLikedMoviesFromLocalStorage(currentUserId);

    if (!savedLikes.some(savedMovie => savedMovie.id === movie.id)) {
      // 좋아요 추가: 영화 전체 데이터를 저장
      const updatedLikes = [...savedLikes, movie];
      saveLikedMoviesToLocalStorage(currentUserId, updatedLikes); // 사용자별 로컬 스토리지에 저장
      setLiked(true); // 좋아요 상태 업데이트
    } else {
      // 좋아요 취소: 영화 ID로 필터링하여 제거
      const updatedLikes = savedLikes.filter(savedMovie => savedMovie.id !== movie.id);
      saveLikedMoviesToLocalStorage(currentUserId, updatedLikes); // 사용자별 로컬 스토리지에 저장
      setLiked(false); // 좋아요 상태 업데이트
    }
  };

  return (
    <div className="movie-list-item" onClick={handlePosterClick}>
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      {/* liked 값에 따라 하트 아이콘 표시 */}
      {liked && <span className="like-icon">❤️</span>}
    </div>
  );
};

export default MovieListItem;
