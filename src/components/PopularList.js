import React, { useState, useEffect, useCallback } from 'react';
import MovieCard from './MovieCard'; // 그리드 뷰에서 사용
import MovieListItem from './MovieListItem'; // 리스트 뷰에서 사용할 새로운 컴포넌트
import './PopularList.css'; // 스타일 파일
import { fetchMovies } from '../services/api'; // API 호출 함수
import Header from './Header';

const PopularList = () => {
    const [movies, setMovies] = useState([]);
    const [currentView, setCurrentView] = useState('grid'); // 초기 뷰: grid
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const [isFetchingMore, setIsFetchingMore] = useState(false); // 무한 스크롤 상태

    // 영화 데이터를 가져오는 함수
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

    // 초기 데이터 로드 및 currentView 변경 시 데이터 리셋
    useEffect(() => {
        fetchPopularMovies(currentPage, currentView === 'grid');
    }, [currentPage, currentView]);

    // 뷰 변경 핸들러
    const handleViewChange = (view) => {
        setCurrentView(view);
        setMovies([]);  // 기존 영화 목록 초기화

        if (view === 'grid') {
            fetchPopularMovies(1, true);  // 초기 페이지로 다시 로드
            setCurrentPage(1);
        } else if (view === 'list') {
            setCurrentPage(1);  // 리스트 뷰로 전환 시 페이지 초기화
        }
    };

    // 다음 페이지로 이동하는 함수
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // 이전 페이지로 이동하는 함수
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 무한 스크롤 핸들러
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
            
            {/* View Toggle Buttons */}
            <div className="view-toggle">
                <button
                    onClick={() => handleViewChange('grid')}
                    className={currentView === 'grid' ? 'active' : ''}
                >
                    <i className="fa fa-th"></i> 그리드 보기
                </button>
                <button
                    onClick={() => handleViewChange('list')}
                    className={currentView === 'list' ? 'active' : ''}
                >
                    <i className="fa fa-list"></i> 리스트 보기
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