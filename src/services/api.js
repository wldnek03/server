import axios from 'axios';

const API_KEY = 'a8fdc4ad0c4a3ec59dc4a0d014a5ec5a'; 
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=ko-KR`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return { results: [] };
  }
};
