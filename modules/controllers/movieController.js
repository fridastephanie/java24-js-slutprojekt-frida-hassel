import { getMoviesApi, getRandomMovieWithTrailerApi } from "../services/movieApi.js";
import { displayMovies, displayRandomMovie } from "../views/movieView.js";
import { hideSortSelect } from "./searchController.js";
import { handleError } from "../utils/errorUtil.js";
import { Movie } from "../models/movie.js";

/**
 * Loads movies from the API, selects the top 10 results,
 * transforms them into Movie objects, and displays them on the page
 * 
 * @param {string} type - The type of movies to load (popular or topRated)
 */
export function loadTopTenMovies(type) {
    getMoviesApi(type)
        .then(results => {
            const top10 = results.slice(0, 10); 
            const movies = mapToMovieObjects(top10);
            const heading = type === "popular" ? "Top 10 most popular" : "Top 10 best rated";
            displayMovies(movies, heading, true); 
            hideSortSelect();
        })
        .catch(handleError); 
}

/**
 * Loads a single random movie with a trailer from the API
 * and passes it to the view for display
 */
export function loadRandomMovieWithTrailer() {
    getRandomMovieWithTrailerApi()
        .then(movie => {
            displayRandomMovie(movie);
            hideSortSelect();
        })
        .catch(handleError);
}

/**
 * Converts JSON data from the API into Movie objects
 * 
 * @param {Array<Object>} data - The JSON movie data from the API
 * @returns {Movie[]} - An array of Movie instances
 */
export function mapToMovieObjects(data) {
    return data.map(movie => new Movie({
        id: movie.id,
        imagePath: movie.poster_path,
        title: movie.title,
        releaseDate: movie.release_date,
        description: movie.overview,
        popularityScore: movie.popularity
    }));
}