import { getUserSession } from "../utils/sessionUtil.js";
import { handleLogin, handleLogout, handleAddToWatchlist } from "../controllers/tmdbUserController.js";
import { postTmdbUserWatchlistApi } from "../services/tmdbUserApi.js";

const loginButton = document.getElementById('login-btn');
const userNameDisplay = document.getElementById('user-name');

/**
 * Displays the users login status by updating the UI elements accordingly
 */
export function displayUserLoginStatus() {
    if (getUserSession()) {
        updateUserNameDisplay();
        updateLoginButton(handleLogout);
    } else {
        updateUserNameDisplay();
        updateLoginButton(handleLogin);
    }
}

/**
 *Creates a Watchlist-button for a specific movie

 * @param {Movie} movie - A Movie object with id
 * @returns {HTMLButtonElement} - A button connected to TMDB watchlist logic
 */
 export function createWatchlistButton(movie) {
    const watchlistButton = document.createElement("button");
    watchlistButton.textContent = "Add to TMDB Watchlist";
    watchlistButton.classList.add("watchlist-btn", "add-button");
    handleAddToWatchlist(movie, watchlistButton);
    return watchlistButton;
}

/**
 * Creates click event for Watchlist-button
 * 
 * @param {HTMLElement} button - The button that will receive the event
 * @param {string} userId - TMDB user ID
 * @param {string} movieId - The ID of the movie
 */
export function configureWatchlistButton(button, userId, movieId) {
    button.addEventListener("click", () => {
        const isInWatchlist = button.dataset.inWatchlist === "true";
        const isAdding = !isInWatchlist;
        updateWatchlistButtonStyle(button, isAdding);
        button.dataset.inWatchlist = isAdding.toString();
        postTmdbUserWatchlistApi(userId, movieId, isAdding)
            .catch(error => {
                handleError(error);
                button.textContent = "Error";
                button.disabled = true;
            });
    }); 
}

/**
 * Updates the text and class of a watchlist button based on whether the movie is in the watchlist
 * 
 * @param {HTMLElement} button - The button to update
 * @param {boolean} isInWatchlist - Whether the movie is already in the users watchlist
 */
export function updateWatchlistButtonStyle(button, isInWatchlist) {
    button.classList.remove("add-button", "remove-button");
    if (isInWatchlist) {
        button.textContent = "Remove from Watchlist";
        button.classList.add("remove-button");
    } else {
        button.textContent = "Add to TMDB Watchlist";
        button.classList.add("add-button");
    }
}

/**
 * Updates or resets the user name display depending on login status
 */
function updateUserNameDisplay() {
    const user = getUserSession();
    userNameDisplay.textContent = user ? `Logged in as: ${user.username}` : '';
}

/**
 * Updates the login button text and behavior based on the login status
 *
 * @param {Function} onClickHandler - The event handler function for the buttons click event
 */
function updateLoginButton(onClickHandler) {
    loginButton.textContent = onClickHandler === handleLogin ? "Log in with TMDB" : "Logout";
    loginButton.onclick = onClickHandler;
}