import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    _cardId;
    _submitButton;
    _handleSubmit;
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._cardId = null;
        this._submitButton = this._popupElement.querySelector(".popup__button__delete-confirmation");
        this._handleSubmit = handleSubmit;
        this._submitButton.addEventListener("click", async () => {
            if (!this._cardId) {
                return;
            }
            await this._handleSubmit(this._cardId);
        });
    }
    open(cardId) {
        if (cardId) {
            this._cardId = cardId;
        }
        super.open();
    }
    close() {
        this._cardId = null;
        super.close();
    }
}
