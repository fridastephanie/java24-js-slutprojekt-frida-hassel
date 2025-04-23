import { API_KEY, API_BASE_URL } from "../config/apiConfig.js";

/**
 * Starts the login flow: fetches request token and redirects to TMDb login
 */
export function getTmdbUserRequestTokenApi() {
    return fetch(`${API_BASE_URL}/authentication/token/new?api_key=${API_KEY}`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            const requestToken = data.request_token;
            const redirectUrl = window.location.origin + window.location.pathname;
            const loginUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectUrl}`;
            window.location.href = loginUrl;
        })
}

/**
 * Fetches the user data from The Movie Database API based on the session ID
 * 
 * @returns {Promise<Object>} - A promise that resolves to user data object
 */
export function getTmdbUserAccountApi() {
    const sessionId = sessionStorage.getItem("tmdbSessionId");
    const url = `${API_BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`;
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => ({
            id: data.id, 
            username: data.username,
            sessionId: sessionId,
        }))
}

/**
 * Checks if a movie is in the users TMDB watchlist
 * 
 * @param {string} userId - The TMDB user ID
 * @param {string} movieId - The movies TMDB ID
 * @returns {Promise<boolean>} - Returns true if the movie is in the watchlist, false otherwise
 */
export function getMovieFromWatchlistApi(userId, movieId) {
    const sessionId = sessionStorage.getItem("tmdbSessionId");
    if (!sessionId) return Promise.reject(new Error("NO_SESSION_ID"));
    const url = `${API_BASE_URL}/account/${userId}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}`;
    return fetch(url)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            return data.results.some(movie => movie.id === movieId);
        });
}

/**
 * Adds a movie to the logged-in users TMDB watchlist
 *
 * @param {number} accountId - The users TMDB account ID
 * @param {number} movieId - The TMDB movie ID
 * @param {boolean} [add=true] - Whether to add or remove from watchlist
 * @returns {Promise<void>}
 */
export function postTmdbUserWatchlistApi(accountId, movieId, add = true) {
    const sessionId = sessionStorage.getItem("tmdbSessionId");
    const url = `${API_BASE_URL}/account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`;
    const body = {
        media_type: "movie",
        media_id: movieId,
        watchlist: add
    };
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    });
}

/**
 * Sends a request to The Movie Database to create a session using the provided request token
 * 
 * @param {string} requestToken - The token received from the TMDB login flow
 * @returns {Promise<Object>} - Resolves to the session data if successful
 */
export function postTmdbUserSessionApi(requestToken) {
    return fetch(`${API_BASE_URL}/authentication/session/new?api_key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request_token: requestToken })
    })
    .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
    });
}