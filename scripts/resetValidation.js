import { hideInputError } from "./hideInputError.js";
import { toggleButtonState } from "./toggleButtonState.js";

export function resetValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  inputList.forEach(input => {
    hideInputError(input);
  });

  toggleButtonState(inputList, buttonElement);
}