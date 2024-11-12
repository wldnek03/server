import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // .env 파일에서 API 키 가져오기
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetail = () => {
  const { id } = useParams(); // URL에서 영화 ID 가져오기
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`);
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!movie) {
    return <p>영화 정보를 불러오지 못했습니다.</p>;
  }

  return (
    <div className="movie-detail">
      <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
      <h1>{movie.title}</h1>
      <p>개봉일: {movie.release_date}</p>
      <p>평점: {movie.vote_average}</p>
      <p>{movie.overview}</p>
    </div>
  );
};

export default MovieDetail;