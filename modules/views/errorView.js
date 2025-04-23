/**
 * Displays a modal with an error title and message, 
 * (if the modal fails to render, falls back to a browser alert)
 * 
 * @param {string} title - The title to display in the error modal
 * @param {string} message - The error message content
 */
export function displayErrorModal(title, message) {
    try {
        let modal = document.getElementById("error-modal");
        if (!modal) {
            modal = createModal();
            const modalContent = modal.querySelector(".modal-content");
            const titleEl = createModalTitle(title);
            const messageEl = createModalMessage(message);
            const closeBtn = createCloseButton();
            modalContent.appendChild(titleEl);
            modalContent.appendChild(messageEl);
            modalContent.appendChild(closeBtn);
            closeBtn.addEventListener("click", () => {
                modal.classList.add("hidden");
            });
        }
        const titleEl = document.getElementById("error-title");
        const messageEl = document.getElementById("error-message");
        titleEl.textContent = title;
        messageEl.textContent = message;
        modal.classList.remove("hidden");
    }  catch (error) {
        alert(`${title}: ${message}`);
    }
}

/**
 * Creates and returns a modal element
 * 
 * @returns {HTMLElement} - The modal element
 */
function createModal() {
    const modal = document.createElement("div");
    modal.id = "error-modal";
    modal.classList.add("modal-overlay");    
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);    
    return modal;
}

/**
 * Creates and returns a title element for the modal
 * 
 * @param {string} title - The title text to be displayed
 * @returns {HTMLElement} - The title element
 */
function createModalTitle(title) {
    const titleEl = document.createElement("h2");
    titleEl.id = "error-title";
    titleEl.classList.add("modal-title");
    titleEl.textContent = title; 
    return titleEl;
}

/**
 * Creates and returns a message element for the modal
 * 
 * @param {string} message - The message text to be displayed
 * @returns {HTMLElement} - The message element
 */
function createModalMessage(message) {
    const messageEl = document.createElement("p");
    messageEl.id = "error-message";
    messageEl.classList.add("modal-message");
    messageEl.textContent = message; 
    return messageEl;
}

/**
 * Creates and returns the close button element for the modal
 * 
 * @returns {HTMLElement} - The close button element
 */
function createCloseButton() {
    const closeBtn = document.createElement("button");
    closeBtn.id = "close-error-modal";
    closeBtn.classList.add("modal-close-btn");
    closeBtn.textContent = "Close";
    return closeBtn;
}