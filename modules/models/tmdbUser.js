export class TMDBUser {
    #id;
    #username;
    #sessionId;

    /**
     * Creates a new TMDBUser instance
     * 
     * @param {Object} userData - An object containing user details
     * @param {string} userData.id - The user ID from TMDB
     * @param {string} userData.username - The username of the user
     * @param {string} userData.sessionId - The session ID of the user
     */
    constructor({ id, username, sessionId }) {
        this.#id = id;
        this.#username = username;
        this.#sessionId = sessionId;
    }

    get id() {
        return this.#id;
    }
    get username() {
        return this.#username;
    }
    get sessionId() {
        return this.#sessionId;
    }

    // Method to check if the user is logged in
    isLoggedIn() {
        return this.#username !== null && this.#sessionId !== null;
    }

    // Method to clear the user session (logout)
    clearUser() {
        this.#username = null;
        this.#sessionId = null;
    }
}