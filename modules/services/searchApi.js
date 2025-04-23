import { API_KEY, API_BASE_URL } from "../config/apiConfig.js";

const SEARCH_BASE_URL = `${API_BASE_URL}/search`;

/**
 * Fetches search results from The Movie Database API based on input and type (movie or person)
 * 
 * @param {string} input - The search query entered by the user
 * @param {string} type - The category to search for (movie or person)
 * @returns {Promise<Object[]>} - A promise that resolves to an array of search result objects (JSON format)
 */

export function getSearchResultsApi(input, type) {
  const apiType = type === 'movie' ? 'movie' : 'person';
  const url = `${SEARCH_BASE_URL}/${apiType}?query=${encodeURIComponent(input)}&language=en-US&page=1&api_key=${API_KEY}`;  
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data.results);
}