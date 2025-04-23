import { API_KEY, API_BASE_URL } from "../config/apiConfig.js";

const MOVIE_BASE_URL = `${API_BASE_URL}/movie`;

/**
 * Fetches movie data from The Movie Database API based on the given movie type
 * 
 * @param {string} type - The category of movies to fetch ('popular' or 'topRated')
 * @returns {Promise<Object[]>} - A promise that resolves to an array of movie objects (JSON format)
 */
export function getMoviesApi(type) {
  const apiType = type === 'topRated' ? 'top_rated' : type;
  const url = `${MOVIE_BASE_URL}/${apiType}?language=en-US&page=1&api_key=${API_KEY}`;  
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data.results);
}

/**
 * Fetches a random popular movie from The Movie Database API and includes a trailer key
 * 
 * @returns {Promise<Object>} - A promise that resolves to a movie object including its trailer key
 */
export function getRandomMovieWithTrailerApi() {
  const randomPage = Math.floor(Math.random() * 20) + 1;
  const url = `${MOVIE_BASE_URL}/popular?language=en-US&page=${randomPage}&api_key=${API_KEY}`;  
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
      return getMovieTrailerApi(randomMovie.id).then(trailer => ({
        ...randomMovie,
        trailerKey: trailer.key
      }));
    });
}

/**
 * Fetches the trailer video for a given movie ID from The Movie Database API
 * 
 * @param {number} movieId - The TMDB ID of the movie
 * @returns {Promise<Object>} - A promise that resolves to a trailer object (or an empty object if no trailer is found)
 */
function getMovieTrailerApi(movieId) {
  const url = `${MOVIE_BASE_URL}/${movieId}/videos?language=en-US&api_key=${API_KEY}`;  
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const trailer = data.results.find(video => video.type === "Trailer");
      return trailer || {};
    });
}
