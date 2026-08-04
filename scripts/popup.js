import { handleEscClose } from "./handleEscClose.js";
import { closeModalByOverlay } from "./closeModalByOverlay.js";

export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

export function setupPopupEventListeners(modal) {
  const closeButton = modal.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(modal);
  });

  modal.addEventListener("click", (event) => {
    closeModalByOverlay(event);
  });
}

export function setupAllPopups() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach(popup => {
    setupPopupEventListeners(popup)
  });
}