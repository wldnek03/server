// 1. 사용자의 아이디와 비밀번호를 localStorage에 저장하고 관리하기
export const saveUserCredentialsToLocalStorage = (userId, password) => {
  try {
    if (!userId || !password) throw new Error('Invalid User ID or Password');
    localStorage.setItem('userId', JSON.stringify(userId));
    localStorage.setItem('password', JSON.stringify(password)); // 비밀번호는 보안상 저장하지 않는 것이 좋음!
  } catch (error) {
    console.error('Error saving credentials to localStorage:', error);
  }
};

// localStorage에서 사용자 아이디와 비밀번호 가져오기
export const getUserCredentialsFromLocalStorage = () => {
  try {
    const userId = localStorage.getItem('userId');
    const password = localStorage.getItem('password'); // 비밀번호는 보안상 저장하지 않는 것이 좋음!
    return {
      userId: userId ? JSON.parse(userId) : null,
      password: password ? JSON.parse(password) : null
    };
  } catch (error) {
    console.error('Error parsing credentials from localStorage:', error);
    return null;
  }
};

// 2. 로그인 여부를 localStorage에 저장하기
export const saveLoginStatusToLocalStorage = (isLoggedIn) => {
  try {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  } catch (error) {
    console.error('Error saving login status to localStorage:', error);
  }
};

// localStorage에서 로그인 여부 가져오기
export const getLoginStatusFromLocalStorage = () => {
  try {
    const storedData = localStorage.getItem('isLoggedIn');
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Error parsing login status from localStorage:', error);
    return null;
  }
};

// 3. 사용자의 선호 영화를 localStorage에 저장하기
export const savePreferredMoviesToLocalStorage = (movies) => {
  try {
    if (!Array.isArray(movies)) throw new Error('Movies must be an array');
    localStorage.setItem('preferredMovies', JSON.stringify(movies));
  } catch (error) {
    console.error('Error saving preferred movies to localStorage:', error);
  }
};

// localStorage에서 사용자의 선호 영화 가져오기
export const getPreferredMoviesFromLocalStorage = () => {
  try {
    const storedData = localStorage.getItem('preferredMovies');
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Error parsing preferred movies from localStorage:', error);
    return null;
  }
};