import { showInputError } from "./showInputError.js";
import { hideInputError } from "./hideInputError.js";
import { toggleButtonState } from "./toggleButtonState.js";

export function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  inputList.forEach(input => {
    input.addEventListener("input", () => {
      if (!input.validity.valid) {
        showInputError(input, input.validationMessage);
        toggleButtonState(inputList, buttonElement);
      } else {
        hideInputError(input);
        toggleButtonState(inputList, buttonElement);
      }
    });
  });
}