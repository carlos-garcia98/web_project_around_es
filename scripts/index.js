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

initialCards.forEach((card) => {
  console.log(card.name);
});

//Edit profile
//Variables
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

//functions
function opneModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  editProfileNameInput.value = profileTitle.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  opneModal(editProfileModal);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  const nameInputValue = editProfileNameInput.value;
  const descriptionValue = editProfileDescriptionInput.value;

  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = descriptionValue;

  closeModal(editProfileModal);
}

//Event Listeners
editProfileBtn.addEventListener("click", handleOpenEditModal);
closeEditProfileModalBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
