export class FormValidator {
    _config;
    _formElement;
    _inputList;
    _buttonElement;
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
        this._buttonElement = formElement.querySelector(config.buttonSubmitSelector);
    }
    handleInvalidInput() {
        return this._inputList.some(input => !input.validity.valid);
    }
    showInputError(inputElement, errorMessage) {
        const inputErrorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.errorInputClass);
        inputErrorElement.textContent = errorMessage;
        inputErrorElement.title = errorMessage;
        inputErrorElement.classList.add(this._config.visibleError);
    }
    hideInputError(inputElement) {
        const inputErrorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.errorInputClass);
        inputErrorElement.classList.remove(this._config.visibleError);
        inputErrorElement.textContent = "";
        inputErrorElement.title = "";
    }
    toggleButtonState() {
        const hasInvalid = this.handleInvalidInput();
        if (hasInvalid) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
        }
        else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        }
    }
    resetValidation() {
        this._inputList.forEach(input => {
            this.hideInputError(input);
        });
        this.toggleButtonState();
    }
    enableValidation() {
        this._inputList.forEach(input => {
            input.addEventListener("input", () => {
                if (!input.validity.valid) {
                    this.showInputError(input, input.validationMessage);
                }
                else {
                    this.hideInputError(input);
                }
                this.toggleButtonState();
            });
        });
    }
}
