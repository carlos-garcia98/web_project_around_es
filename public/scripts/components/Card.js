export class Card {
    _templateSelector;
    _element;
    _id;
    _name;
    _link;
    _isLiked;
    _handleCardClick;
    _handleDeleteClick;
    _handleLikeClick;
    constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._templateSelector = templateSelector;
        this._id = data._id;
        this._name = data.name;
        this._link = data.link;
        this._isLiked = data.isLiked;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }
    getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector);
        const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
        return cardElement;
    }
    handleLikeButton = async (likeButton) => {
        const updateLike = await this._handleLikeClick(this._id, this._isLiked);
        if (!updateLike) {
            return;
        }
        this._isLiked = updateLike.isLiked;
        likeButton.classList.toggle("card__like-button_is-active", this._isLiked);
    };
    handleDeleteButton = () => {
        this._handleDeleteClick(this._id);
    };
    setEventListeners(cardElement) {
        const likeButton = cardElement.querySelector(".card__like-button");
        const deleteButton = cardElement.querySelector(".card__delete-button");
        const cardImage = cardElement.querySelector(".card__image");
        likeButton.addEventListener("click", () => {
            this.handleLikeButton(likeButton);
        });
        deleteButton.addEventListener("click", () => {
            this.handleDeleteButton();
        });
        cardImage.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });
    }
    generateCard() {
        this._element = this.getTemplate();
        const cardImage = this._element.querySelector(".card__image");
        const cardDescription = this._element.querySelector(".card__title");
        const likeButton = this._element.querySelector(".card__like-button");
        cardImage.src = this._link;
        cardImage.alt = this._name;
        cardDescription.textContent = this._name;
        if (this._isLiked) {
            likeButton.classList.add("card__like-button_is-active");
        }
        this.setEventListeners(this._element);
        return this._element;
    }
}
