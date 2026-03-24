const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

//Open and close modal functions
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

//Cards
const cardList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card__template")
  .content.querySelector(".card");
const cardModal = document.querySelector("#image-popup");
const closeCardModal = cardModal.querySelector(".popup__close");
const imageCardModal = cardModal.querySelector(".popup__image");
const descriptionCardModal = cardModal.querySelector(".popup__caption");

//Create and render cards
initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardList);
});

function getCardElement(
  name = "Sin título",
  link = "../images/placeholder.jpg",
) {
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

//Card modal close event
closeCardModal.addEventListener("click", () => {
  closeModal(cardModal);
});

//Add new card
const addCardBtn = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#new-card-popup");
const closeAddCardModalBtn = addCardModal.querySelector(".popup__close");
const addCardForm = addCardModal.querySelector("#new-card-form");
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");

addCardBtn.addEventListener("click", () => {
  openModal(addCardModal);
});

closeAddCardModalBtn.addEventListener("click", () => {
  closeModal(addCardModal);
});

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

addCardForm.addEventListener("submit", handleCardFormSubmit);

//Edit profile
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const closeEditProfileModalBtn =
  editProfileModal.querySelector(".popup__close");
const editProfileForm = editProfileModal.querySelector("#edit-profile-form");
const editProfileNameInput = editProfileForm.querySelector(
  ".popup__input_type_name",
);
const editProfileDescriptionInput = editProfileForm.querySelector(
  ".popup__input_type_description",
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function fillProfileForm() {
  editProfileNameInput.value = profileTitle.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editProfileModal);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  const nameInputValue = editProfileNameInput.value;
  const descriptionValue = editProfileDescriptionInput.value;

  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = descriptionValue;

  closeModal(editProfileModal);
}

editProfileBtn.addEventListener("click", handleOpenEditModal);
closeEditProfileModalBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
