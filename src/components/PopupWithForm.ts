import { Popup } from "./Popup.js";

interface FormValues {
  [key: string]: string;
}

type SumbitFormFunction = (data: FormValues) => void;

export class PopupWithForm extends Popup {
  private _handleSubmitForm: SumbitFormFunction;
  private _inputList!: NodeListOf<HTMLInputElement>;
  private _formElement: HTMLFormElement;

  constructor(popupSelector: string, handleSubmitForm: SumbitFormFunction) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = document.querySelector(".popup__form") as HTMLFormElement;
  }

  private getInputValues(): FormValues {
    const formValues: FormValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    
    return formValues;
  }

  protected setEventListeners(): void {
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