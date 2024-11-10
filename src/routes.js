import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Wishlist from './pages/Wishlist';
import Popular from './pages/Popular';
import Search from './pages/Search';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  </Router>
);

export default AppRoutes;
