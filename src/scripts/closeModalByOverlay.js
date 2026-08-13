import { closeModal } from "./popup.js";

export function closeModalByOverlay(event) {
  closeModal(event.target);
}