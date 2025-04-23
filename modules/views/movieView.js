import { createWatchlistButton } from "./tmdbUserView.js";
import { loadRandomMovieWithTrailer } from "../controllers/movieController.js";

const contentSection = document.getElementById("content-section");

/**
 * Displays a list of Movie objects to the DOM inside the content section,
 * adds ranking numbers if its a top 10 list
 * 
 * @param {Movie[]} movieList - An array of Movie instances to display
 * @param {string} headingText - Optional heading text to display above the list
 * @param {boolean} isTopList - If true, displays rank numbers (1–10) for each movie
 */
export function displayMovies(movieList, headingText = "", isTopList = false) {
    try {
        contentSection.innerHTML = "";
        if (headingText) {
            const heading = createSubHeading(headingText);
            heading.classList.add("top-movie-heading");
            contentSection.appendChild(heading);
        }
        movieList.forEach((movie, index) => {
            const movieCardArticle = createMovieCard(movie, isTopList ? index + 1 : null);
            contentSection.appendChild(movieCardArticle);
        });
    } catch (error) {
        displayErrorModal("Rendering Error", "Failed to display movies, please try again later!");
    }
}

/**
 * Displays a single random movie with trailer to the DOM
 * 
 * @param {Object} movie - A movie object with trailer info
 */
export function displayRandomMovie(movie) {
    try {
        contentSection.innerHTML = "";
        const movieCard = createMovieTrailerCard(movie);
        contentSection.appendChild(movieCard);
    } catch (error) {
        displayErrorModal("Rendering Error", "Failed to display the random movie!");
    }
}

/**
 * Creates a movie card for regular movie display,
 * adds a rank number if its part of the top 10 list
 * 
 * @param {Movie} movie - A Movie instance
 * @param {number|null} rankNumber - Optional rank number (1–10)
 * @returns {HTMLElement} - A movie card element
 */
function createMovieCard(movie, rankNumber = null) {
    const article = document.createElement("article");
    article.classList.add("movie-card-article");
    if (rankNumber !== null) {
        const rank = createRankNumber(rankNumber);
        article.appendChild(rank);
    }
    const image = createImageElement(movie.imagePath, movie.title);
    const title = createTitle(movie.title);
    const release = createParagraph("Release", movie.releaseDate);
    const popularity = createParagraph("Popularity", movie.popularityScore);
    const description = document.createElement("p");
    description.textContent = movie.description;    
    const watchlistButton = createWatchlistButton(movie);
    article.append(image, title, release, popularity, description, watchlistButton);
    return article;
}

/**
 * Creates a movie card including a YouTube trailer iframe
 * 
 * @param {Object} movie - A movie object containing a trailerKey
 * @returns {HTMLElement} - A DOM element for the trailer card
 */
function createMovieTrailerCard(movie) {
    const article = document.createElement("article");
    article.classList.add("movie-trailer-article");
    const subheading = createSubHeading("Get inspired by a random movie trailer:");      
    const iframe = createYouTubeIframe(movie.trailerKey);
    const title = createTitle(movie.title);  
    const watchlistButton = createWatchlistButton(movie);
    const randomButton = createRandomButton();
    article.append(subheading, iframe, title, watchlistButton, randomButton);
    return article;
}

/**
 * Creates a rank number element for top list movies
 * 
 * @param {number} rankNumber - The ranking position (1–10)
 * @returns {HTMLElement} - A DOM element showing the ranking
 */
function createRankNumber(rankNumber) {
    const rank = document.createElement("div");
    rank.classList.add("movie-rank-number");
    rank.textContent = `#${rankNumber}`;
    return rank;
}

/**
 * Creates an img element
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text
 * @returns {HTMLElement}
 */
function createImageElement(src, alt) {
    const imageUrl = src
        ? `https://image.tmdb.org/t/p/w500${src}`
        : "./image/image-not-found.jpg";
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = alt || "Movie poster";
    return img;
}

/**
 * Creates an h2 element for a movie title
 * 
 * @param {string} title - The title of the movie
 * @returns {HTMLElement}
 */
function createTitle(title) {
    const h4 = document.createElement("h4");
    h4.classList.add("movie-title");
    h4.textContent = title || "Unknown title";
    return h4;
}

/**
 * Creates a paragraph with a label and value
 * 
 * @param {string} label - The label text
 * @param {string} value - The value to display
 * @returns {HTMLElement}
 */
function createParagraph(label, value) {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${label}:</strong> ${value}`;
    return p;
}

/**
 * Creates an h3 element for a subheading
 * 
 * @param {string} text - The subheading text
 * @returns {HTMLElement}
 */
function createSubHeading(text) {
    const h3 = document.createElement("h3");
    h3.classList.add("movie-trailer-heading");
    h3.textContent = text;
    return h3;
}

/**
 * Creates a YouTube iframe for a movie trailer
 * 
 * @param {string} trailerKey
 * @returns {HTMLElement}
 */
function createYouTubeIframe(trailerKey) {
    const iframe = document.createElement("iframe");
    iframe.classList.add("responsive-trailer");
    iframe.src = `https://www.youtube.com/embed/${trailerKey}`;
    iframe.frameBorder = "0";
    iframe.allow =
        "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    return iframe;
}

/**
 * Creates a button for random movie trailer
 * 
 * @returns {HTMLElement}
 */
function createRandomButton() {
    const button = document.createElement("button");
    button.id = "random-movie-btn";
    button.textContent = "Random a new movie trailer";
    button.addEventListener("click", () => {
        loadRandomMovieWithTrailer(); 
    });
    return button;
}