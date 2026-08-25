import { Popup } from "./Popup.js";

type HandleSubmit = (cardId: string) => Promise<void>;

export class PopupWithConfirmation extends Popup {
  private _cardId: string | null;
  private _submitButton: HTMLButtonElement;
  private _handleSubmit: HandleSubmit;

  constructor(popupSelector: string, handleSubmit: HandleSubmit) {
    super(popupSelector);
    this._cardId = null;
    this._submitButton = this._popupElement.querySelector(".popup__button__delete-confirmation") as HTMLButtonElement;
    this._handleSubmit = handleSubmit;

    this._submitButton.addEventListener("click", async () => {
      if (!this._cardId) {
        return;
      }

      await this._handleSubmit(this._cardId);
    })
  }

  open(cardId?: string): void {
    if (cardId) {
      this._cardId = cardId;
    }
    super.open();
  }

  close(): void {
    this._cardId = null;
    super.close();
  }
}