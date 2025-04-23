const contentSection = document.getElementById("content-section");

/**
 * Displays a list of Person objects to the DOM inside the content section
 * 
 * @param {Person[]} personList - An array of Person instances to display
 */
export function displayPersons(personList) {
    try {
        contentSection.innerHTML = ""; 
        personList.forEach(person => {
            const personCardArticle = createPersonCard(person);
            contentSection.appendChild(personCardArticle);
        });
    } catch (error) {
        displayErrorModal("Rendering Error", "Failed to display persons, please try again later!");
    }
}

/**
 * Creates a person card element
 * 
 * @param {Person} person - A Person instance
 * @returns {HTMLElement} - The person card element
 */
function createPersonCard(person) {
    const personCardArticle = document.createElement("article");
    personCardArticle.classList.add("person-card-article");
    const image = createImageElement(person.imagePath, person.name);
    const name = createTitle(person.name);
    const popularity = createParagraph("Popularity", person.popularityScore);
    const knownForDepartment = createParagraph("Known for", person.knownForDepartment);
    const knownForMovies = createParagraph("Movies", person.knownForMovies?.length ? person.knownForMovies.join(', ') : 'None');
    const knownForTvShows = createParagraph("TV Shows", person.knownForTvShows?.length ? person.knownForTvShows.join(', ') : 'None');
    personCardArticle.append(image, name, popularity, knownForDepartment, knownForMovies, knownForTvShows);
    return personCardArticle;
}

/**
 * Creates an img element for a person
 * 
 * @param {string} imagePath - Image path
 * @param {string} name - Name of the person (for alt text)
 * @returns {HTMLElement}
 */
function createImageElement(imagePath, name) {
    const imageUrl = imagePath
        ? `https://image.tmdb.org/t/p/w200${imagePath}`
        : "./image/image-not-found.jpg";
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = name || "No name";
    return img;
}

/**
 * Creates a title element (h2) for a persons name
 * 
 * @param {string} name - Name of the person
 * @returns {HTMLElement}
 */
function createTitle(name) {
    const h4 = document.createElement("h4");
    h4.textContent = name || 'Unknown name';
    return h4;
}

/**
 * Creates a paragraph element with label and value
 * 
 * @param {string} label - Label for the paragraph
 * @param {string} value - Value for the paragraph
 * @returns {HTMLElement}
 */
function createParagraph(label, value) {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${label}:</strong> ${value ?? 'N/A'}`;
    return p;
}