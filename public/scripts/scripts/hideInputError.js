export function hideInputError(inputElement) {
    const formElement = inputElement.form;
    const inputErrorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("form__input-type-error");
    inputErrorElement.classList.remove("popup__input-error_active");
    inputErrorElement.textContent = "";
    inputErrorElement.title = "";
}
