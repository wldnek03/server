import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PopularList from './components/PopularList';
import SearchMovies from './pages/SearchMovies';
import SignIn from './pages/SignIn';
import Wishlist from './pages/Wishlist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/popular" element={<PopularList/>} />
          <Route path="/search" element={<SearchMovies/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
      </Routes>
    </Router>
  );
}

export default App;
