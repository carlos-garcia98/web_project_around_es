import { closeModal } from "./popup.js";
export function handleEscClose(event) {
    const escKey = event.key === "Escape";
    const modal = document.querySelector(".popup_is-opened");
    if (escKey && modal) {
        closeModal(modal);
    }
}
