// 좋아요한 영화 목록을 로컬 스토리지에 저장하는 함수 (사용자별로 저장)
export const saveLikedMoviesToLocalStorage = (userId, likedMovies) => {
  try {
    const userLikesKey = `likedMovies_${userId}`; // 사용자 ID 기반 키 생성
    localStorage.setItem(userLikesKey, JSON.stringify(likedMovies));
  } catch (error) {
    console.error('Error saving liked movies to localStorage:', error);
  }
};

// 로컬 스토리지에서 좋아요한 영화 목록을 불러오는 함수 (사용자별로 반환)
export const getLikedMoviesFromLocalStorage = (userId) => {
  try {
    const userLikesKey = `likedMovies_${userId}`; // 사용자 ID 기반 키 생성
    const savedLikes = localStorage.getItem(userLikesKey);
    return savedLikes ? JSON.parse(savedLikes) : [];
  } catch (error) {
    console.error('Error getting liked movies from localStorage:', error);
    return [];
  }
};

// 현재 로그인된 사용자 정보를 로컬 스토리지에서 가져오는 함수
export const getUserFromLocalStorage = () => {
  try {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error('Error getting user data from localStorage:', error);
    return null;
  }
};
