import React, { useEffect, useState, useCallback } from 'react';
import { getFromLocalStorage } from '../utils/localStorage';
import './Wishlist.css';
import Header from '../components/Header'; // Header 컴포넌트 임포트

const MovieWishlist = () => {
  const [wishlistMovies, setWishlistMovies] = useState([]);
  const [isMobile] = useState(window.innerWidth <= 768);

  const updateVisibleMovies = useCallback((movies) => {
    console.log('Updating visible movies');
  }, []);

  const calculateLayout = useCallback(() => {
    const containerWidth = window.innerWidth;
    const movieCardWidth = isMobile ? 90 : 220;
    const horizontalGap = isMobile ? 10 : 15;

    Math.floor(containerWidth / (movieCardWidth + horizontalGap));

    updateVisibleMovies(wishlistMovies);
  }, [isMobile, wishlistMovies, updateVisibleMovies]);

  useEffect(() => {
    const savedWishlist = getFromLocalStorage('movieWishlist') || [];
    setWishlistMovies(savedWishlist);
    updateVisibleMovies(savedWishlist);
  }, [updateVisibleMovies]);

  useEffect(() => {
    window.addEventListener('resize', calculateLayout);

    return () => window.removeEventListener('resize', calculateLayout);
  }, [calculateLayout]);

  return (
    <div>
      {/* Header 컴포넌트를 추가 */}
      <Header />

      {/* 위시리스트 콘텐츠 */}
      <div className="wishlist">
        {wishlistMovies.length > 0 ? (
          <div className="movie-list">
            {wishlistMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>위시리스트가 비어있습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MovieWishlist;