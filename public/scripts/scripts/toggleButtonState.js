import { hasInvalidInput } from "./hasInvalidInput.js";
export function toggleButtonState(inputList, buttonElement) {
    const hasInvalid = hasInvalidInput(inputList);
    if (hasInvalid) {
        buttonElement.classList.add("popup__button-disabled");
    }
    else {
        buttonElement.classList.remove("popup__button-disabled");
    }
}
