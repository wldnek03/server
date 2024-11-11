import React, { useState, useEffect } from 'react';
import MovieCard from '/Users/jiwoo/netflix-clone/src/components/MovieCard';

const PopularList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=a8fdc4ad0c4a3ec59dc4a0d014a5ec5a');
        if (!response.ok) {
          throw new Error('Failed to fetch popular movies');
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovies();
  }, []);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default PopularList;
