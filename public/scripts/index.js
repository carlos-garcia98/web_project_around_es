import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";
// CONSTANTS
// Buttons
const addCardBtn = document.querySelector(".profile__add-button");
const editProfileBtn = document.querySelector(".profile__edit-button");
// Forms
const addCardFormElement = document.querySelector("#new-card-form");
const editProfileForm = document.querySelector("#edit-profile-form");
// Inputs
const editProfileNameInput = editProfileForm.querySelector(".popup__input_type_name");
const editProfileDescriptionInput = editProfileForm.querySelector(".popup__input_type_description");
const editProfileImageInput = editProfileForm.querySelector(".popup__input_type_profile-image");
// Start Form Validaton.
const editProfileFormValidation = new FormValidator(defaultFormConfig, editProfileForm);
editProfileFormValidation.enableValidation();
const addCardFormValidation = new FormValidator(defaultFormConfig, addCardFormElement);
addCardFormValidation.enableValidation();
// End Form Validation
// Start Profile and Image Popup
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description"
});
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
// End Profile and Image Popup
// Start Cards
function createCard(cardData) {
    const card = new Card(cardData, "#card__template", (name, link) => {
        imagePopup.open(name, link);
    });
    return card.generateCard();
}
const cardList = new Section({
    items: initialCards,
    renderer: (cardData) => {
        cardList.addItem(createCard(cardData));
    }
}, ".cards__list");
cardList.renderItems();
const addCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
    const name = inputValues["place-name"];
    const link = inputValues.link;
    if (!name || !link) {
        return;
    }
    const newCard = {
        name,
        link
    };
    cardList.addItem(createCard(newCard));
    addCardPopup.close();
});
addCardPopup.setEventListeners();
// End Cards
// Start Profile Editing
const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
    const userName = inputValues.name;
    const userJob = inputValues.description;
    // const userProfileImage = inputValues["profile-image"];
    if (!userName || !userJob) {
        return;
    }
    userInfo.setUserInfo({
        name: userName,
        job: userJob
    });
    editProfilePopup.close();
});
editProfilePopup.setEventListeners();
// End Profile Editing
// Start Popup Opening
addCardBtn.addEventListener("click", () => {
    addCardFormValidation.resetValidation();
    addCardPopup.open();
});
editProfileBtn.addEventListener("click", () => {
    const { name, job } = userInfo.getUserInfo();
    editProfileNameInput.value = name;
    editProfileDescriptionInput.value = job;
    editProfileFormValidation.resetValidation();
    editProfilePopup.open();
});
