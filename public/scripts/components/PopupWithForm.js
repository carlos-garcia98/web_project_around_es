import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    _handleSubmitForm;
    _inputList;
    _formElement;
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._formElement = document.querySelector(".popup__form");
    }
    getInputValues() {
        const formValues = {};
        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }
    setEventListeners() {
        this._formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this._handleSubmitForm(this.getInputValues());
        });
        super.setEventListeners();
    }
    close() {
        this._formElement.reset();
        super.close();
    }
}
