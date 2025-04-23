import { handleLoginRedirect } from '../controllers/tmdbUserController.js';
import { TMDBUser } from '../models/tmdbUser.js';
import { getTmdbUserAccountApi } from "../services/tmdbUserApi.js";
import { displayUserLoginStatus } from "../views/tmdbUserView.js";
import { handleError } from './errorUtil.js';

// Keys for sessionStorage
export const USER_KEY = "tmdbUser";
export const SESSION_ID_KEY = "tmdbSessionId";

/**
 * Initializes the user session by handling the login redirect and fetching user data if logged in
 * 
 * @returns {Promise<void>} - Resolves when the session is initialized or if already logged in
 */
export function loadUserSession() {
    return handleLoginRedirect()
        .then(didLogin => {
            if (didLogin) {
                return getTmdbUserAccountApi().then(userData => {
                    saveUserSession(userData);
                    displayUserLoginStatus();
                    history.replaceState(null, "", window.location.pathname);
                });
            } else {
                displayUserLoginStatus();
            }
        })
        .catch(handleError);  
}

/**
 * Saves the user data to sessionStorage
 * 
 * @param {Object} userData - The user data object to save
 */
export function saveUserSession(userData) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
}

/**
 * Retrieves the user data from sessionStorage
 * 
 * @returns {TMDBUser|null} - A TMDBUser instance if the user is logged in, or null if no user data exists in sessionStorage
 *  */
export function getUserSession() {
    const userData = sessionStorage.getItem(USER_KEY);
    return userData ? new TMDBUser(JSON.parse(userData)) : null;  
}

/**
 * Removes the user data from sessionStorage, effectively logging out the user
 */
export function removeUserSession() {
    sessionStorage.removeItem(USER_KEY);
}