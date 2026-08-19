import type { CardData } from "../utils/constants.js";

export class Card {
  private _templateSelector: string;
  private _element!: HTMLElement;
  private _name: string;
  private _link: string;
  private _handleCardClick: (name: string, link: string) => void;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void
  ) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  private getTemplate(): HTMLElement {
    const cardTemplate = document.querySelector(this._templateSelector) as HTMLTemplateElement;
    const cardElement = cardTemplate.content.querySelector(".card")!.cloneNode(true) as HTMLElement;

    return cardElement;
  }

  private handleLikeButton = (likeButton: HTMLButtonElement): void => {
    likeButton.classList.toggle("card__like-button_is-active");
  }

  private handleDeleteButton = (cardElement: HTMLElement): void => {
    cardElement.remove();
  }

  private setEventListeners(cardElement: HTMLElement): void {
    const likeButton = cardElement.querySelector(".card__like-button") as HTMLButtonElement;
    const deleteButton = cardElement.querySelector(".card__delete-button") as HTMLButtonElement;
    const cardImage = cardElement.querySelector(".card__image") as HTMLImageElement;

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

  generateCard(): HTMLElement {
    this._element = this.getTemplate();

    const cardImage = this._element.querySelector(".card__image") as HTMLImageElement;
    const cardDescription = this._element.querySelector(".card__title") as HTMLTitleElement;

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardDescription.textContent = this._name;

    this.setEventListeners(this._element);

    return this._element;
  }
}