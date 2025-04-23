export class Person {
    #imagePath;
    #name;
    #popularityScore;
    #knownForDepartment;
    #knownForMovies;
    #knownForTvShows;

    /**
     * Creates a new Person instance
     * 
     * @param {Object} personData - An object containing person details
     * @param {string} personData.imagePath - The path to the persons image
     * @param {string} personData.name - The persons name
     * @param {number} personData.popularityScore - The persons popularity score from The Movie Database
     * @param {string} personData.knownForDepartment - The department the person is known for (like acting, directing)
     * @param {Array} personData.knownForMovies - An array of movies the person is known for
     * @param {Array} personData.knownForTvShows - An array of TV shows the person is known for
     */
    constructor({ imagePath, name, popularityScore, knownForDepartment, knownForMovies, knownForTvShows }) {
        this.#imagePath = imagePath;
        this.#name = name;
        this.#popularityScore = popularityScore;
        this.#knownForDepartment = knownForDepartment;
        this.#knownForMovies = knownForMovies;
        this.#knownForTvShows = knownForTvShows;
    }

    get imagePath() {
        return this.#imagePath;
    }
    get name() {
        return this.#name;
    }
    get popularityScore() {
        return this.#popularityScore;
    }
    get knownForDepartment() {
        return this.#knownForDepartment;
    }
    get knownForMovies() {
        return this.#knownForMovies;
    }
    get knownForTvShows() {
        return this.#knownForTvShows;
    }
}