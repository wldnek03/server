import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PopularList from './components/PopularList';
import SearchMovies from './pages/SearchMovies';
import SignIn from './pages/SignIn';
import Wishlist from './pages/Wishlist';
import MovieDetail from './pages/MovieDetail';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchMovies />} />
        <Route path="/movie/:id" element={<MovieDetail/>} /> 
        <Route path="/oauth/callback" element={<SignIn />} />
        {/* Protected routes */}
        <Route 
          path="/popular" 
          element={
              <PopularList />
          } 
        />
        <Route 
          path="/wishlist" 
          element={
              <Wishlist />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;