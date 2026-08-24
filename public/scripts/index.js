import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Api } from "./components/Api.js";
// CONSTANTS
// Buttons
const addCardBtn = document.querySelector(".profile__add-button");
const editProfileBtn = document.querySelector(".profile__edit-button");
const editAvatarBtn = document.querySelector(".image_container");
// Forms
const addCardForm = document.querySelector("#new-card-form");
const editProfileForm = document.querySelector("#edit-profile-form");
const editAvatarForm = document.querySelector("#edit-avatar-form");
// Inputs
const editProfileNameInput = editProfileForm.querySelector(".popup__input_type_name");
const editProfileDescriptionInput = editProfileForm.querySelector(".popup__input_type_description");
const editAvatarInput = editAvatarForm.querySelector(".popup__input_type_avatar");
// Start Api instance creation
const apiRequest = new Api();
// End Api instance creation
// Start Form Validaton.
const editProfileFormValidation = new FormValidator(defaultFormConfig, editProfileForm);
editProfileFormValidation.enableValidation();
const addCardFormValidation = new FormValidator(defaultFormConfig, addCardForm);
addCardFormValidation.enableValidation();
const editAvatarFormValidation = new FormValidator(defaultFormConfig, editAvatarForm);
editAvatarFormValidation.enableValidation();
// End Form Validation
// Start Profile and Image Popup
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
    avatarSelector: ".profile__image"
});
(async function () {
    try {
        const response = await apiRequest.getUserInfo();
        userInfo.setUserInfo({
            name: response.name,
            job: response.about,
            avatar: response.avatar
        });
    }
    catch (error) {
        console.error(error);
    }
})();
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
// End Profile and Image Popup
// Start Cards
function createCard(cardData) {
    const card = new Card(cardData, "#card__template", (name, link) => {
        imagePopup.open(name, link);
    }, async (id) => {
        await apiRequest.deleteCard(id);
    }, async (id, isLiked) => {
        if (isLiked) {
            return await apiRequest.removeLike(id);
        }
        return await apiRequest.addLike(id);
    });
    return card.generateCard();
}
const cardList = new Section({
    items: [],
    renderer: (cardData) => {
        cardList.addItem(createCard(cardData));
    }
}, ".cards__list");
(async function () {
    try {
        const cards = await apiRequest.getCards();
        cardList.setItems(cards);
        cardList.renderItems();
    }
    catch (error) {
        console.log(error);
    }
})();
const addCardPopup = new PopupWithForm("#new-card-popup", async (inputValues) => {
    const name = inputValues["place-name"];
    const link = inputValues.link;
    if (!name || !link) {
        return;
    }
    const response = await apiRequest.addCard(name, link);
    const newCard = {
        _id: response._id,
        name: response.name,
        link: response.link,
        isLiked: response.isLiked
    };
    cardList.addItem(createCard(newCard));
    addCardPopup.close();
});
addCardPopup.setEventListeners();
// End Cards
// Start Profile Editing
const editProfilePopup = new PopupWithForm("#edit-popup", async (inputValues) => {
    const userName = inputValues.name;
    const userJob = inputValues.description;
    if (!userName || !userJob) {
        return;
    }
    const response = await apiRequest.updateUserInfo(userName, userJob);
    userInfo.setUserInfo({
        name: response.name,
        job: response.about,
        avatar: response.avatar
    });
    editProfilePopup.close();
});
editProfilePopup.setEventListeners();
const editAvatarPopup = new PopupWithForm("#edit-avatar", async (inputValues) => {
    const userAvatar = inputValues.avatar;
    if (!userAvatar) {
        return;
    }
    const response = await apiRequest.updateAvatar(userAvatar);
    userInfo.setUserInfo({
        name: response.name,
        job: response.about,
        avatar: response.avatar
    });
    editAvatarPopup.close();
});
editAvatarPopup.setEventListeners();
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
editAvatarBtn.addEventListener("click", () => {
    editAvatarFormValidation.resetValidation();
    editAvatarPopup.open();
});
