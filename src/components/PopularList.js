import React, { useState, useEffect, useCallback } from 'react';
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
    const [isFetchingMore, setIsFetchingMore] = useState(false); // 무한 스크롤 상태

    const fetchPopularMovies = async (page, resetMovies = false) => {
        try {
            const data = await fetchMovies(`/movie/popular?page=${page}`);
            console.log(data);

            if (resetMovies) {
                setMovies(data.results);
            } else {
                setMovies((prevMovies) => [...prevMovies, ...data.results]);
            }

            setTotalPages(data.total_pages);
        } catch (err) {
            setError('Failed to fetch popular movies.');
        }
    };

    useEffect(() => {
        fetchPopularMovies(currentPage, currentView === 'grid');
    }, [currentPage, currentView]);

    const handleViewChange = (view) => {
        setCurrentView(view);

        if (view === 'grid') {
            setMovies([]);
            fetchPopularMovies(1, true);
            setCurrentPage(1);
        } else if (view === 'list') {
            setMovies([]);
            setCurrentPage(1);
        }
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

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
            !isFetchingMore &&
            currentView === 'list'
        ) {
            if (currentPage < totalPages) {
                setIsFetchingMore(true);
                setCurrentPage((prevPage) => prevPage + 1);
                setIsFetchingMore(false);
            }
        }
    }, [currentPage, totalPages, isFetchingMore, currentView]);

    useEffect(() => {
        if (currentView === 'list') {
            window.addEventListener('scroll', handleScroll);
        } else {
            window.removeEventListener('scroll', handleScroll);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll, currentView]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

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
                                <div className="movie-list-item" key={movie.id}>
                                    <MovieListItem movie={movie} />
                                </div>
                            ))
                        ) : (
                            <p>No movies available</p>
                        )}
                    </div>
                )}
            </div>

            {/* Pagination Controls for Grid View */}
            {currentView === 'grid' && (
                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        이전
                    </button>
                    <span>{`${currentPage} / ${totalPages}`}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        다음
                    </button>
                </div>
            )}
        </div>
    );
};

export default PopularList;