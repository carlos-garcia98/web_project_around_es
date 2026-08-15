import { initialCards } from "./initialCards.js";
import { setEventListeners } from "./setEventListeners.js";
import { resetValidation } from "./resetValidation.js";
import { openModal, closeModal, setupAllPopups } from "./popup.js";
// CONSTANTS
//Cards
const cardList = document.querySelector(".cards__list");
const cardTemplate = document
    .querySelector("#card__template")
    .content.querySelector(".card");
// Modals
const cardModal = document.querySelector("#image-popup");
const addCardModal = document.querySelector("#new-card-popup");
const editProfileModal = document.querySelector("#edit-popup");
// Card modal content
const imageCardModal = cardModal.querySelector(".popup__image");
const descriptionCardModal = cardModal.querySelector(".popup__caption");
// Buttons
const addCardBtn = document.querySelector(".profile__add-button");
const editProfileBtn = document.querySelector(".profile__edit-button");
// Forms
const addCardForm = addCardModal.querySelector("#new-card-form");
const editProfileForm = editProfileModal.querySelector("#edit-profile-form");
// Inputs
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");
const editProfileNameInput = editProfileForm.querySelector(".popup__input_type_name");
const editProfileDescriptionInput = editProfileForm.querySelector(".popup__input_type_description");
const editProfileImageInput = editProfileForm.querySelector(".popup__input_type_profile-image");
// Profile
const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// FUNCTIONS
function getCardElement(name = "Sin título", link = "../images/placeholder.jpg") {
    const cardElement = cardTemplate.cloneNode(true);
    const titleElement = cardElement.querySelector(".card__title");
    const imageElement = cardElement.querySelector(".card__image");
    titleElement.textContent = name;
    imageElement.src = link;
    imageElement.alt = name;
    const likeBtn = cardElement.querySelector(".card__like-button");
    likeBtn.addEventListener("click", (evt) => {
        evt.target.classList.toggle("card__like-button_is-active");
    });
    const deleteBtn = cardElement.querySelector(".card__delete-button");
    deleteBtn.addEventListener("click", () => {
        cardElement.remove();
    });
    //Card modal open event
    imageElement.addEventListener("click", () => {
        imageCardModal.src = link;
        imageCardModal.alt = name;
        descriptionCardModal.textContent = name;
        openModal(cardModal);
    });
    return cardElement;
}
function renderCard(name, link, container) {
    container.prepend(getCardElement(name, link));
}
function fillProfileForm() {
    editProfileNameInput.value = profileTitle.textContent;
    editProfileDescriptionInput.value = profileDescription.textContent;
}
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = { name: "", link: "" };
    newCard.name = cardNameInput.value;
    newCard.link = cardLinkInput.value;
    initialCards.push(newCard);
    renderCard(newCard.name, newCard.link, cardList);
    closeModal(addCardModal);
    cardNameInput.value = "";
    cardLinkInput.value = "";
}
function handleProfileFormSubmit(event) {
    event.preventDefault();
    const profileImageInputValue = editProfileImageInput.value;
    const nameInputValue = editProfileNameInput.value;
    const descriptionValue = editProfileDescriptionInput.value;
    profileImage.src = profileImageInputValue;
    profileTitle.textContent = nameInputValue;
    profileDescription.textContent = descriptionValue;
    closeModal(editProfileModal);
}
function handleOpenEditModal() {
    fillProfileForm();
    resetValidation(editProfileForm);
    openModal(editProfileModal);
}
// EVENT LISTENERS
addCardBtn.addEventListener("click", () => {
    resetValidation(addCardForm);
    openModal(addCardModal);
});
editProfileBtn.addEventListener("click", handleOpenEditModal);
addCardForm.addEventListener("submit", handleCardFormSubmit);
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
// INITIALISATION
setupAllPopups();
initialCards.forEach((card) => {
    renderCard(card.name, card.link, cardList);
});
const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach(formElement => {
    setEventListeners(formElement);
});
