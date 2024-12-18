import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeCard from '../components/HomeCard';
import Header from '../components/Header';
import './Home.css';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');

  const navigate = useNavigate();

  // Fetch movies helper function
  const fetchMovies = async (endpoint) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3${endpoint}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko-KR`
      );
      const data = await response.json();
      console.log('Fetched data for', endpoint, data); // 콘솔 로그 추가
      return data;
    } catch (error) {
      console.error(`Error fetching movies from ${endpoint}:`, error);
      return { results: [] }; // Return an empty array if there's an error
    }
  };

  // Fetch movie categories
  useEffect(() => {
    const getPopularMovies = async () => {
      const data = await fetchMovies('/movie/popular');
      setPopularMovies(data.results || []);
      setFeaturedMovie(data.results?.[0] || null); // 첫 번째 영화를 배너로 설정
    };

    const getLatestMovies = async () => {
      const data = await fetchMovies('/movie/upcoming');
      setLatestMovies(data.results || []);
    };

    const getTopRatedMovies = async () => {
      const data = await fetchMovies('/movie/top_rated');
      setTopRatedMovies(data.results || []);
    };


    getPopularMovies();
    getLatestMovies();
    getTopRatedMovies();
  }, []);

  // Scroll functions
  const scrollLeft = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollLeft -= 300;
  };

  const scrollRight = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollLeft += 300;
  };

  // Fetch trailer
  const fetchTrailer = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko-KR`
      );
      const data = await response.json();
      console.log('Trailer data:', data); // 콘솔 로그 추가
      const trailer = data.results?.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer'
      );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } else {
        alert('해당 영화의 트레일러를 찾을 수 없습니다.');
        setTrailerUrl('');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  // Play trailer
  const handlePlayClick = () => {
    if (featuredMovie) fetchTrailer(featuredMovie.id);
  };

  // Navigate to movie details
  const handleInfoClick = () => {
    if (featuredMovie) navigate(`/movie/${featuredMovie.id}`);
  };

  return (
    <div className="home">
      <Header />

      {/* Banner Section */}
      {featuredMovie && (
        <div
          className="banner"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path})`,
          }}
        >
          <div className="banner-content">
            <h1>{featuredMovie.title}</h1>
            <p>{featuredMovie.overview}</p>
            <div className="banner-buttons">
              <button className="play-btn" onClick={handlePlayClick}>
                재생
              </button>
              <button className="info-btn" onClick={handleInfoClick}>
                상세 정보
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trailer Section */}
      {trailerUrl && (
        <div className="trailer-section">
          <iframe
            width="560"
            height="315"
            src={trailerUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Movie Sections */}
      {[
        { title: '인기 영화', id: 'popular', movies: popularMovies },
        { title: '최신 영화', id: 'latest', movies: latestMovies },
        { title: '최고 평점 영화', id: 'topRated', movies: topRatedMovies },
      ].map(({ title, id, movies }) => (
        <div key={id}>
          <div className="section-title">
            <h1>{title}</h1>
          </div>
          <div className="movie-section">
            <button className="scroll-btn left" onClick={() => scrollLeft(id)}>
              ◀
            </button>
            <div id={id} className="movie-row">
              {movies?.length > 0 ? (
                movies.map((movie) => (
                  <HomeCard key={movie.id} movie={movie} />
                ))
              ) : (
                <p>영화를 불러올 수 없습니다. 다시 시도해주세요.</p>
              )}
            </div>
            <button className="scroll-btn right" onClick={() => scrollRight(id)}>
              ▶
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
