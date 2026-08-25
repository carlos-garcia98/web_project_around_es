export const defaultFormConfig = {
  inputSelector: ".popup__input",
  buttonSubmitSelector: ".popup__button",
  inactiveButtonClass: "popup__button-disabled",
  errorInputClass: "form__input-type-error",
  visibleError: "popup__input-error_active"
}

export interface CardData {
  _id: string;
  name: string;
  link: string;
  isLiked: boolean;
}

export interface CardFormData {
  name: string;
  link: string;
}

export interface UserFormData {
  name: string;
  about: string;
}

export interface AvatarFormData {
  avatar: string;
}

export interface UserData {
  name: string;
  about: string;
  avatar: string;
  _id: string;
}