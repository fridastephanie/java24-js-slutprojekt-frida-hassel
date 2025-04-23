import { displayErrorModal } from "../views/errorView.js";

/**
 * Displays tailored error messages by checking for specific keywords in the error message
 *
 * @param {any} error - An Error object with a message
 */
export function handleError(error) {    
    const message = error.message || "An unexpected error occurred!";
    if (message.startsWith("LOGIN_DENIED")) {
        displayErrorModal("Login Canceled", "Your login attempt was denied, please try again!");
    } else if (message.includes("401")) {
        displayErrorModal("Login Required", "You are not logged in or your session has expired!");
    } else if (message.includes("403")) {
        displayErrorModal("Access Denied", "You do not have permission to access this resource!");
    } else if (message.includes("404")) {
        displayErrorModal("Not Found", "The requested resource could not be found!");
    } else if (message.includes("500")) {
        displayErrorModal("Server Error", "Oops, something went wrong on the server!");
    } else {
        displayErrorModal("Unexpected Error", message);
    }
}