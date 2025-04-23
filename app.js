import { loadRandomMovieWithTrailer, loadTopTenMovies } from "./modules/controllers/movieController.js";
import { clearSearchInput, handleSearch, handleSorting } from "./modules/controllers/searchController.js";
import { loadUserSession } from "./modules/utils/sessionUtil.js";

    const homePageBtn = document.getElementById("home-page-btn");
    const topRatedBtn = document.getElementById("top-rated-btn");
    const popularBtn = document.getElementById("most-popular-btn");
    const randomBtn = document.getElementById("random-trailer-btn");
    const searchForm = document.getElementById("search-form");
    const sortSelect = document.getElementById("sort-select");

    homePageBtn.addEventListener("click", () => {
        clearSearchInput();
        window.location.reload(); 
    });
    topRatedBtn.addEventListener("click", () => {
        clearSearchInput();
        loadTopTenMovies('topRated'); 
    });
    popularBtn.addEventListener("click", () => {
        clearSearchInput(); 
        loadTopTenMovies('popular'); 
    });
    randomBtn.addEventListener("click", () => {
        clearSearchInput(); 
        loadRandomMovieWithTrailer();  
    });
    searchForm.addEventListener("submit", handleSearch);
    sortSelect?.addEventListener("change", (event) => handleSorting(event.target.value));

    loadUserSession();