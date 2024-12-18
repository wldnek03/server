import React, { useState, useEffect } from 'react';
import MovieListItem from '../components/MovieListItem'; // MovieListItem 컴포넌트 임포트
import Header from '../components/Header'; // Header 컴포넌트 임포트
import { getLikedMoviesFromLocalStorage, getUserFromLocalStorage } from '../utils/localStorage'; // 유틸리티 함수 임포트

const Wishlist = () => {
  const [wishlistMovies, setWishlistMovies] = useState([]); // 위시리스트 상태
  const [currentUserId, setCurrentUserId] = useState(null); // 현재 로그인된 사용자 ID

  // 컴포넌트 마운트 시 현재 로그인된 사용자와 좋아요 목록 가져오기
  useEffect(() => {
    const currentUser = getUserFromLocalStorage(); // 현재 사용자 정보 가져오기
    if (currentUser && currentUser.id) {
      setCurrentUserId(currentUser.id); // 사용자 ID 설정
      const savedLikes = getLikedMoviesFromLocalStorage(currentUser.id); // 사용자별 좋아요 목록 가져오기
      setWishlistMovies(savedLikes); // 저장된 전체 영화를 상태로 설정
    }
  }, []);

  return (
    <div>
      {/* Header 컴포넌트를 페이지 상단에 추가 */}
      <Header />

      <h1 style={{ color: 'orange', fontSize: '2rem' }}>My Wishlist</h1>

      {/* 현재 사용자 ID 표시 (디버깅 또는 UI 요소로 활용 가능) */}
      {currentUserId && (
        <p style={{ fontSize: '1rem', color: 'gray' }}>
          사용자 ID: {currentUserId}
        </p>
      )}

      {/* 위시리스트에 있는 영화들을 MovieListItem으로 렌더링 */}
      <div className="wishlist-container">
        {wishlistMovies.length > 0 ? (
          wishlistMovies.map((movie) => (
            <MovieListItem key={movie.id} movie={movie} />
          ))
        ) : (
          <p>위시리스트에 추가된 영화가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
