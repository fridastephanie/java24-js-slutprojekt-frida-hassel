import { Person } from "../models/person.js";

/**
 * Converts JSON data from the API into Person objects
 * 
 * @param {Array<Object>} data - The JSON person data from the API
 * @returns {Person[]} - An array of Person instances
 */
export function mapToPersonObjects(data) {
    return data.map(person => new Person({
        imagePath: person.profile_path,
        name: person.name,
        popularityScore: person.popularity,
        knownForDepartment: person.known_for_department,
        knownForMovies: person.known_for.filter(item => item.media_type === 'movie').map(item => item.title),
        knownForTvShows: person.known_for.filter(item => item.media_type === 'tv').map(item => item.name)
    }));
}