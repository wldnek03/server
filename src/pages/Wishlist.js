import React, { useState, useEffect } from 'react';
import MovieListItem from '../components/MovieListItem'; // MovieListItem 컴포넌트 임포트
import Header from '../components/Header'; // Header 컴포넌트 임포트

const Wishlist = () => {
  const [wishlistMovies, setWishlistMovies] = useState([]);

  // localStorage에서 좋아요한 영화 목록 불러오기
  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedMovies')) || [];
    fetchLikedMovies(savedLikes);
  }, []);

  // 좋아요한 영화 ID로부터 영화 데이터를 불러오는 함수 (예시)
  const fetchLikedMovies = async (likedMovieIds) => {
    try {
      const movieData = await Promise.all(
        likedMovieIds.map(async (id) => {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=a8fdc4ad0c4a3ec59dc4a0d014a5ec5a`);
          const data = await response.json();
          return data;
        })
      );
      setWishlistMovies(movieData);
    } catch (error) {
      console.error('Error fetching liked movies:', error);
    }
  };

  return (
    <div>
      {/* Header 컴포넌트를 페이지 상단에 추가 */}
      <Header />

      <h1 style={{ color: 'orange', fontSize: '2rem' }}>My Wishlist</h1>

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