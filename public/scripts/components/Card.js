import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
export class Card {
    _templateSelector;
    _element;
    _name;
    _link;
    _handleCardClick;
    _deleteConfirmationPopup;
    _deleteCofnrimationButton;
    constructor(data, templateSelector, handleCardClick) {
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._deleteConfirmationPopup = new PopupWithConfirmation("#delete-confirmation-popup");
        this._deleteCofnrimationButton = document.querySelector(".popup__button__delete-confirmation");
    }
    getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector);
        const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
        return cardElement;
    }
    handleLikeButton = (likeButton) => {
        likeButton.classList.toggle("card__like-button_is-active");
    };
    handleDeleteButton = (cardElement) => {
        this._deleteConfirmationPopup.open();
        this._deleteConfirmationPopup.setEventListeners();
        this._deleteCofnrimationButton.addEventListener("click", () => {
            cardElement.remove();
            this._deleteConfirmationPopup.close();
        });
    };
    setEventListeners(cardElement) {
        const likeButton = cardElement.querySelector(".card__like-button");
        const deleteButton = cardElement.querySelector(".card__delete-button");
        const cardImage = cardElement.querySelector(".card__image");
        likeButton.addEventListener("click", () => {
            this.handleLikeButton(likeButton);
        });
        deleteButton.addEventListener("click", () => {
            this.handleDeleteButton(cardElement);
        });
        cardImage.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });
    }
    generateCard() {
        this._element = this.getTemplate();
        const cardImage = this._element.querySelector(".card__image");
        const cardDescription = this._element.querySelector(".card__title");
        cardImage.src = this._link;
        cardImage.alt = this._name;
        cardDescription.textContent = this._name;
        this.setEventListeners(this._element);
        return this._element;
    }
}
