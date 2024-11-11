import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PopularList from './components/PopularList';
import SearchMovies from './pages/SearchMovies';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/popular" element={<PopularList/>} />
          <Route path="/search" element={<SearchMovies/>} />
      </Routes>
    </Router>
  );
}

export default App;
