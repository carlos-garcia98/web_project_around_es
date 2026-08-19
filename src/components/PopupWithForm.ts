import { Popup } from "./Popup.js";

interface FormValues {
  [key: string]: string;
}

type SumbitFormFunction = (data: FormValues) => void;

export class PopupWithForm extends Popup {
  private _handleSubmitForm: SumbitFormFunction;
  private _inputList: HTMLInputElement[];
  private _formElement: HTMLFormElement;

  constructor(popupSelector: string, handleSubmitForm: SumbitFormFunction) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popupElement.querySelector(".popup__form") as HTMLFormElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(".popup__input")) as HTMLInputElement[];
  }

  private getInputValues(): FormValues {
    const formValues: FormValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    
    return formValues;
  }

  setEventListeners(): void {
    this._formElement.addEventListener("submit", (e: SubmitEvent) => {
      e.preventDefault()
      this._handleSubmitForm(this.getInputValues());
    });

    super.setEventListeners();
  }

  close(): void {
    this._formElement.reset();

    super.close();
  }
}