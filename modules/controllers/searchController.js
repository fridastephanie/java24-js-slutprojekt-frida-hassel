import { getSearchResultsApi } from "../services/searchApi.js";
import { mapToMovieObjects } from "./movieController.js";
import { mapToPersonObjects } from "./personController.js";
import { displayMovies } from "../views/movieView.js";
import { displayPersons } from "../views/personView.js";  
import { displayErrorModal } from "../views/errorView.js";
import { handleError } from "../utils/errorUtil.js";

const searchInput = document.getElementById("search-input");
const searchTypeSelect = document.getElementById("search-type-select");
const sortSelect = document.getElementById("sort-select");

let currentMovieResults = [];
let currentPersonResults = [];

/**
 * Handles the search input, fetches results from the API, and displays them
 *
 * @param {Event} event - The form submission event triggered by the user
 */
export function handleSearch(event) {
    event.preventDefault();  
    const input = searchInput.value.trim(); 
    const searchType = searchTypeSelect.value;
    if (sortSelect) {
        sortSelect.value = ''; 
    }
    if (!input) {
        displayErrorModal("Missing Input", "Please enter a search term before submitting!");
        return;
    }
    if (input) {
        getSearchResultsApi(input, searchType)
            .then(results => {
                if (!results || results.length === 0) {
                    displayErrorModal("No Results Found", `No results were found for your search: "${input}"`);
                    return;
                }
                if (searchType === 'movie') {
                    handleMovieResults(results);
                } else {
                    handlePersonResults(results);
                }
            })
            .catch(handleError); 
    }
}

/**
 * Sorts the results based on the selected sort method
 *
 * @param {string} sortBy - Selected sort method (alpha-asc, alpha-desc, popularity-asc, popularity-desc)
 */
export function handleSorting(sortBy) {
    if (currentMovieResults.length > 0) {
        sortResults(currentMovieResults, sortBy, displayMovies); 
    }
    if (currentPersonResults.length > 0) {
        sortResults(currentPersonResults, sortBy, displayPersons);
    }
}

/**
 * Hides the sorting select dropdown
 */
export function hideSortSelect() {
    if (sortSelect) sortSelect.classList.add("hidden");
}

/**
 * Clears the value of the search input field
 */
export function clearSearchInput() {
    if (searchInput) {
        searchInput.value = ''; 
    }
}

/**
 * Processes and handles the movie results, displays them, and triggers sorting
 * 
 * @param {Array<Object>} results - The movie results returned from the API
 */
function handleMovieResults(results) {
    const movies = mapToMovieObjects(results);
    currentMovieResults = movies; 
    currentPersonResults = []; 
    displayMovies(movies);
    displaySortSelect();
    applySelectedSortMethod();
}

/**
 * Processes and handles the person results, displays them, and triggers sorting
 * 
 * @param {Array<Object>} results - The person results returned from the API
 */
function handlePersonResults(results) {
    const persons = mapToPersonObjects(results);
    currentPersonResults = persons; 
    currentMovieResults = [];
    displayPersons(persons);
    displaySortSelect();
    applySelectedSortMethod();
}

/**
 * General function to sort results (movies or persons) based on the selected sort method
 * 
 * @param {Array<Object>} results - The results array (movies or persons)
 * @param {string} sortBy - The sort method selected by the user
 * @param {Function} displayFunction - Function to display the sorted results (displayMovies or displayPersons)
 */
function sortResults(results, sortBy, displayFunction) {
    const sortedResults = [...results];
    switch (sortBy) {
        case "alpha-asc":
            sortedResults.sort((a, b) => a.title ? a.title.localeCompare(b.title) : a.name.localeCompare(b.name));
            break;
        case "alpha-desc":
            sortedResults.sort((a, b) => b.title ? b.title.localeCompare(a.title) : b.name.localeCompare(a.name));
            break;
        case "popularity-asc":
            sortedResults.sort((a, b) => a.popularityScore - b.popularityScore);
            break;
        case "popularity-desc":
            sortedResults.sort((a, b) => b.popularityScore - a.popularityScore);
            break;
    }
    displayFunction(sortedResults); 
}

/**
 * Displays sorting options when there are results
 */
function displaySortSelect() {
    if (sortSelect) {
        sortSelect.classList.remove("hidden");
    }
}

/**
 * Retrieves the selected sorting method and applies it immediately
 */
function applySelectedSortMethod() {
    if (sortSelect) {
        const sortBy = sortSelect.value;
        handleSorting(sortBy);
    }
}