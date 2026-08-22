import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import type { CardData } from "./utils/constants.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";
import { Api } from "./components/Api.js";

// CONSTANTS
// Buttons
const addCardBtn = document.querySelector(".profile__add-button") as HTMLButtonElement;
const editProfileBtn = document.querySelector(".profile__edit-button") as HTMLButtonElement;
const deleteButton = document.querySelector(".popup__button__delete-confirmation") as HTMLButtonElement;

// Forms
const addCardFormElement = document.querySelector("#new-card-form") as HTMLFormElement;
const editProfileForm = document.querySelector("#edit-profile-form") as HTMLFormElement;

// Inputs
const editProfileNameInput = editProfileForm.querySelector(
  ".popup__input_type_name",
) as HTMLInputElement;

const editProfileDescriptionInput = editProfileForm.querySelector(
  ".popup__input_type_description",
) as HTMLInputElement;

const editProfileImageInput = editProfileForm.querySelector(".popup__input_type_avatar") as HTMLInputElement;

// Start Api instance creation
const apiRequest = new Api();
// End Api instance creation

// Start Form Validaton.
const editProfileFormValidation = new FormValidator(defaultFormConfig, editProfileForm);
editProfileFormValidation.enableValidation();

const addCardFormValidation = new FormValidator(defaultFormConfig, addCardFormElement);
addCardFormValidation.enableValidation();
// End Form Validation

// Start Profile and Image Popup
const userInfo = new UserInfo(
  {
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
    avatarSelector: ".profile__image"
  }
);

(async function() {
  try {
    const response = await apiRequest.getUserInfo("/v1/users/me");
    userInfo.setUserInfo(
      {
        name: response.name,
        job: response.about,
        avatar: response.avatar
      }
    )
  } catch (error: unknown) {
    console.error(error);
  }
})();

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
// End Profile and Image Popup

// Start Cards
function createCard(cardData: CardData): HTMLElement {
  const card = new Card(cardData, "#card__template", (name, link) => {
    imagePopup.open(name, link);
  });

  return card.generateCard();
}

const cardList = new Section<CardData>(
  {
    items: [],
    renderer: (cardData) => {
      cardList.addItem(createCard(cardData));
    }
  },
  ".cards__list"
);

(async function() {
  try {
    const cards = await apiRequest.getCards("/v1/cards");
    cardList.setItems(cards);
    cardList.renderItems()
  } catch (error: unknown) {
    console.log(error);
  }
})();

const addCardPopup = new PopupWithForm("#new-card-popup", async (inputValues) => {
  const name = inputValues["place-name"];
  const link = inputValues.link;

  if (!name || !link) {
    return 
  }

  const response = await apiRequest.addCard(
    name,
    link,
    "/v1/cards"
  );

  const newCard = {
    name: response.name,
    link: response.link
  }

  cardList.addItem(createCard(newCard));
  addCardPopup.close();
});
addCardPopup.setEventListeners();
// End Cards

// Start Profile Editing
const editProfilePopup = new PopupWithForm("#edit-popup", async (inputValues) => {
  const userName = inputValues.name;
  const userJob = inputValues.description;
  const userProfileImage = inputValues["avatar"];

  if (!userName || !userJob || !userProfileImage) {
    return;
  }

  const response = await apiRequest.updateUserInfo(
    userName,
    userJob,
    userProfileImage,
    "/v1/users/me"
  );
  
  userInfo.setUserInfo({
    name: response.name,
    job: response.about,
    avatar: response.avatar
  });

  editProfilePopup.close();
});
editProfilePopup.setEventListeners();
// End Profile Editing

// Start Popup Opening
addCardBtn.addEventListener("click", () => {
  addCardFormValidation.resetValidation()
  addCardPopup.open();
});

editProfileBtn.addEventListener("click", () => {
  const { name, job, avatar } = userInfo.getUserInfo();

  editProfileNameInput.value = name;
  editProfileDescriptionInput.value = job;
  editProfileImageInput.value = avatar;

  editProfileFormValidation.resetValidation();
  editProfilePopup.open();
});