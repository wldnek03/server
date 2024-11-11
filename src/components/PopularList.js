import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard'; // 그리드 뷰에서 사용
import MovieListItem from './MovieListItem'; // 리스트 뷰에서 사용할 새로운 컴포넌트
import './PopularList.css'; // 스타일 파일
import { fetchMovies } from '/Users/jiwoo/netflix-clone/src/services/api'; // API 호출 함수
import Header from './Header';

const PopularList = () => {
  const [movies, setMovies] = useState([]);
  const [currentView, setCurrentView] = useState('grid'); // 초기 뷰: grid
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

  // Fetch movies based on the current page
  useEffect(() => {
    const fetchPopularMovies = async (page) => {
      try {
        const data = await fetchMovies(`/movie/popular?page=${page}`); // 페이지 번호 추가
        console.log(data); // 데이터를 콘솔에 출력하여 확인
        setMovies(data.results);
        setTotalPages(data.total_pages); // 전체 페이지 수 설정
      } catch (err) {
        setError('Failed to fetch popular movies.');
      }
    };

    fetchPopularMovies(currentPage); // 현재 페이지에 맞는 영화 데이터 가져오기
  }, [currentPage]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="popular-container">
      <Header />
      <div className="view-toggle">
        <button
          onClick={() => handleViewChange('grid')}
          className={currentView === 'grid' ? 'active' : ''}
        >
          <i className="fa fa-th"></i> Grid View
        </button>
        <button
          onClick={() => handleViewChange('list')}
          className={currentView === 'list' ? 'active' : ''}
        >
          <i className="fa fa-list"></i> List View
        </button>
      </div>

      {/* Apply correct CSS class based on currentView */}
      <div className={`movie-${currentView}`}>
        {currentView === 'grid' ? (
          <div className="movie-grid">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <p>No movies available</p>
            )}
          </div>
        ) : (
          <div className="movie-list">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieListItem key={movie.id} movie={movie} />
              ))
            ) : (
              <p>No movies available</p>
            )}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          이전
        </button>
        <span>{`${currentPage} / ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
};

export default PopularList;