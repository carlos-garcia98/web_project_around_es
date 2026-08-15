export function showInputError(inputElement, errorMessage) {
    const formElement = inputElement.form;
    const inputErrorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("form__input-type-error");
    inputErrorElement.textContent = errorMessage;
    inputErrorElement.title = errorMessage;
    inputErrorElement.classList.add("popup__input-error_active");
}
