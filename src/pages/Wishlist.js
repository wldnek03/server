import React, { useEffect, useState } from 'react';
import { getFromLocalStorage } from '../utils/localStorage';
import MovieCard from '../components/MovieCard';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = getFromLocalStorage('movieWishlist') || [];
    setWishlist(savedWishlist);
  }, []);

  return (
    <div className="wishlist">
      <h1>My Wishlist</h1>
      <div className="movie-grid">
        {wishlist.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
