import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Wishlist from './pages/Wishlist';
import PopularList from './pages/PopularList';
import SearchMovies from './pages/SearchMovies';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/popular" element={<PopularList />} />
      <Route path="/search" element={<SearchMovies />} />
    </Routes>
  </Router>
);

export default AppRoutes;
