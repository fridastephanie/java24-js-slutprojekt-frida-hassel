export class Movie {
    #id;
    #imagePath;
    #title;
    #releaseDate;
    #description;
    #popularityScore;

    /**
     * Creates a new Movie instance
     * 
     * @param {Object} movieData - An object containing movie details
     * @param {number} movieData.id - The unique identifier for the movie from The Movie Database
     * @param {string} movieData.imagePath - The path to the movies poster image
     * @param {string} movieData.title - The movies title
     * @param {string} movieData.releaseDate - The movies release date
     * @param {string} movieData.description - A short description or overview of the movie
     * @param {number} movieData.popularityScore - The movies popularity score from The Movie Database
     */

    constructor({ id, imagePath, title, releaseDate, description, popularityScore }) {
        this.#id = id;
        this.#imagePath = imagePath;
        this.#title = title;
        this.#releaseDate = releaseDate;
        this.#description = description;
        this.#popularityScore = popularityScore;
    }

    get id() {
        return this.#id;
    }
    get imagePath() {
        return this.#imagePath;
    }
    get title() {
        return this.#title;
    }
    get releaseDate() {
        return this.#releaseDate;
    }
    get description() {
        return this.#description;
    }
    get popularityScore() {
        return this.#popularityScore;
    }
}