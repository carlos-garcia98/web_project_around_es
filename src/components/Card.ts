import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import type { CardData } from "../utils/constants.js";

type HandleCardClick = (name: string, link: string) => void;
type HandleDeleteClick = (id: string) => Promise<void>;
type HandleLikeClick = (id: string, isLiked: boolean) => Promise<CardData | undefined>;

export class Card {
  private _templateSelector: string;
  private _element!: HTMLElement;
  private _id: string;
  private _name: string;
  private _link: string;
  private _isLiked: boolean;
  private _handleCardClick: HandleCardClick;
  private _handleDeleteClick: HandleDeleteClick;
  private _handleLikeClick: HandleLikeClick;
  private _deleteConfirmationPopup: PopupWithConfirmation;
  private _deleteCofnrimationButton: HTMLButtonElement;

  constructor(
    data: CardData,
    templateSelector: string, 
    handleCardClick: HandleCardClick,
    handleDeleteClick: HandleDeleteClick,
    handleLikeClick: HandleLikeClick
  ) {
    this._templateSelector = templateSelector;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._deleteConfirmationPopup = new PopupWithConfirmation("#delete-confirmation-popup");
    this._deleteCofnrimationButton = document.querySelector(".popup__button__delete-confirmation") as HTMLButtonElement;
  }

  private getTemplate(): HTMLElement {
    const cardTemplate = document.querySelector(this._templateSelector) as HTMLTemplateElement;
    const cardElement = cardTemplate.content.querySelector(".card")!.cloneNode(true) as HTMLElement;

    return cardElement;
  }

  private handleLikeButton = async (likeButton: HTMLButtonElement): Promise<CardData | undefined> => {
    const updateLike = await this._handleLikeClick(this._id, this._isLiked);

    if (!updateLike) {
      return;
    }

    this._isLiked = updateLike.isLiked;

    likeButton.classList.toggle("card__like-button_is-active", this._isLiked);
  }

  private handleDeleteButton = (cardElement: HTMLElement): void => {
    this._deleteConfirmationPopup.open();
    this._deleteConfirmationPopup.setEventListeners();
    
    this._deleteCofnrimationButton.addEventListener("click", async () => {
      try {
        await this._handleDeleteClick(this._id);

        cardElement.remove();
        this._deleteConfirmationPopup.close();
      } catch (error) {
        console.log(error);
      }
    });
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
    const likeButton = this._element.querySelector(".card__like-button") as HTMLButtonElement;


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