export class Popup {
    _popupElement;
    _closeButton;
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._closeButton = this._popupElement.querySelector(".popup__close");
    }
    open() {
        this._popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.handleEscClose);
    }
    close() {
        this._popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
    handleEscClose = (e) => {
        const escKey = e.key === "Escape";
        const modal = document.querySelector(".popup_is-opened");
        if (escKey && modal) {
            this.close();
        }
    };
    setEventListeners() {
        this._closeButton.addEventListener("click", this.close);
        this._popupElement.addEventListener("click", (e) => {
            if (e.target === this._popupElement) {
                this.close();
            }
        });
    }
}
