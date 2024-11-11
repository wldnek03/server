import React, { useState } from 'react';
import MovieCard from '/Users/jiwoo/netflix-clone/src/components/MovieCard';

const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const searchMovies = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${query}`
      );
      if (!response.ok) {
        throw new Error('Failed to search movies');
      }
      const data = await response.json();
      setMovies(data.results);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <div className="error-message">Error: {error}</div>}
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;
