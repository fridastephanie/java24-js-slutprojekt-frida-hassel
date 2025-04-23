import { USER_KEY, SESSION_ID_KEY, saveUserSession } from "../utils/sessionUtil.js";
import { getTmdbUserRequestTokenApi, getTmdbUserAccountApi, postTmdbUserSessionApi, getMovieFromWatchlistApi } from "../services/tmdbUserApi.js";
import { displayUserLoginStatus, updateWatchlistButtonStyle, configureWatchlistButton } from "../views/tmdbUserView.js";
import { handleError } from "../utils/errorUtil.js";

/**
 * Starts the TMDb login process
 */
export function handleLogin() {
    getTmdbUserRequestTokenApi().catch(handleError);
}

/**
 * Handles redirect from The Movie Database login: 
 * denies login or creates a session if token is present
 * 
 * @returns {Promise<boolean>} - Resolves to true if login succeeds, otherwise false
 */
export function handleLoginRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get("request_token");
    const denied = urlParams.get("denied");
    if (denied === "true") {
        history.replaceState(null, "", window.location.pathname); 
        displayUserLoginStatus(); 
        return Promise.reject(new Error("LOGIN_DENIED"));
    }
    if (!requestToken) {
        displayUserLoginStatus();
        return Promise.resolve(false);
    }
    return postTmdbUserSessionApi(requestToken)
        .then(data => {
            sessionStorage.setItem(SESSION_ID_KEY, data.session_id);
            history.replaceState(null, "", window.location.pathname); 
            displayUserLoginStatus();
            return true;
        });
}

/**
 * Logs out the user, clears session data, and updates UI
 */
export function handleLogout() {
    try {
        sessionStorage.removeItem(USER_KEY);
        sessionStorage.removeItem(SESSION_ID_KEY);
        displayUserLoginStatus();
        window.location.reload();
    } catch (error) {
        handleError(error);
    }
}

/**
 * Fetches and saves the user data, then updates the UI
 */
export function fetchAndSaveUser() {
    getTmdbUserAccountApi()
        .then(userData => {
            saveUserSession(userData);
            displayUserLoginStatus();
        })
        .catch(handleError);
}

/**
 * Handles the logic for adding/removing a movie to/from a users TMDB Watchlist
 * 
 * @param {Movie} movie - A Movie object with id
 * @param {HTMLElement} watchlistButton - The button that will handle clicks
 */
export function handleAddToWatchlist(movie, watchlistButton) {
    if (!movie.id) return;
    const sessionId = sessionStorage.getItem(SESSION_ID_KEY);
    if (!sessionId) {
        watchlistButton.textContent = "Login to add to Watchlist";
        watchlistButton.disabled = true;
        return;
    }
    getTmdbUserAccountApi()
        .then(user => {
            return getMovieFromWatchlistApi(user.id, movie.id)
                .then(isInWatchlist => {
                    watchlistButton.dataset.inWatchlist = isInWatchlist;
                    updateWatchlistButtonStyle(watchlistButton, isInWatchlist);
                    configureWatchlistButton(watchlistButton, user.id, movie.id);
                });
        })
        .catch(error => {
            watchlistButton.textContent = "Login to add to Watchlist";
            watchlistButton.disabled = true;
            handleError(error, 401);
        });
}