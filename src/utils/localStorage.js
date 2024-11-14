// 좋아요한 영화 목록을 로컬 스토리지에 저장하는 함수 (전체 영화 데이터 저장)
export const saveLikedMoviesToLocalStorage = (likedMovies) => {
  try {
    localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
  } catch (error) {
    console.error('Error saving liked movies to localStorage:', error);
  }
};

// 로컬 스토리지에서 좋아요한 영화 목록을 불러오는 함수 (전체 영화 데이터 반환)
export const getLikedMoviesFromLocalStorage = () => {
  try {
    const savedLikes = localStorage.getItem('likedMovies');
    return savedLikes ? JSON.parse(savedLikes) : [];
  } catch (error) {
    console.error('Error getting liked movies from localStorage:', error);
    return [];
  }
};

// 특정 영화가 좋아요 상태인지 확인하는 함수 (영화 ID로 확인)
export const isMovieLiked = (movieId) => {
  const likedMovies = getLikedMoviesFromLocalStorage();
  return likedMovies.some(movie => movie.id === movieId);
};

// 사용자 정보를 로컬 스토리지에 저장하는 함수 (회원가입 시 사용)
export const saveUserToLocalStorage = (userId, password) => {
  try {
    const userData = { userId, password };
    localStorage.setItem('user', JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data to localStorage:', error);
  }
};

// 로컬 스토리지에서 사용자 정보를 불러오는 함수
export const getUserFromLocalStorage = () => {
  try {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error('Error getting user data from localStorage:', error);
    return null;
  }
};

// 로그인 여부를 로컬 스토리지에 저장하는 함수 (로그인 시 사용)
export const saveLoginStatusToLocalStorage = (isLoggedIn) => {
  try {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  } catch (error) {
    console.error('Error saving login status to localStorage:', error);
  }
};

// 로컬 스토리지에서 로그인 여부를 불러오는 함수
export const getLoginStatusFromLocalStorage = () => {
  try {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn ? JSON.parse(isLoggedIn) : false;
  } catch (error) {
    console.error('Error getting login status from localStorage:', error);
    return false;
  }
};

// 로그아웃 처리 및 로그인 상태 초기화
export const clearLoginStatusFromLocalStorage = () => {
  try {
    localStorage.removeItem('isLoggedIn'); // 로그인 상태 제거
    localStorage.removeItem('user'); // 사용자 정보 제거
  } catch (error) {
    console.error('Error clearing login status from localStorage:', error);
  }
};