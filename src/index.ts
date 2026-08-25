import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import type { CardData } from "./utils/constants.js"; 
import { defaultFormConfig } from "./utils/constants.js";
import { Api } from "./components/Api.js";

// CONSTANTS
// Buttons
const addCardBtn = document.querySelector(".profile__add-button") as HTMLButtonElement;
const editProfileBtn = document.querySelector(".profile__edit-button") as HTMLButtonElement;
const editAvatarBtn = document.querySelector(".image_container") as HTMLElement;


// Forms
const addCardForm = document.querySelector("#new-card-form") as HTMLFormElement;
const editProfileForm = document.querySelector("#edit-profile-form") as HTMLFormElement;
const editAvatarForm = document.querySelector("#edit-avatar-form") as HTMLFormElement;

// Submit Buttons
const addCardSubmitBtn = addCardForm.querySelector(".popup__button") as HTMLButtonElement;
const editProfileSubmitBtn = editProfileForm.querySelector(".popup__button") as HTMLButtonElement;
const editAvatarSubmitBtn = editAvatarForm.querySelector(".popup__button") as HTMLButtonElement;

// Inputs
const editProfileNameInput = editProfileForm.querySelector(
  ".popup__input_type_name",
) as HTMLInputElement;

const editProfileDescriptionInput = editProfileForm.querySelector(
  ".popup__input_type_description",
) as HTMLInputElement;

const editAvatarInput = editAvatarForm.querySelector(".popup__input_type_avatar") as HTMLInputElement;

// Start Api instance creation
const apiRequest = new Api(
  {
    baseUrl: "https://around-api.es.tripleten-services.com",
    headers: {
      authorization: "65f7b6bc-80d5-4e30-8b61-55dcc05ca3fc",
      "Content-Type": "application/json"
    }
  }
);
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
const userInfo = new UserInfo(
  {
    nameSelector: ".profile__title",
    aboutSelector: ".profile__description",
    avatarSelector: ".profile__image"
  }
);

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
// End Profile and Image Popup

// Start Cards
const cardsMap = new Map<string, HTMLElement>();

const deleteConfirmationPopup = new PopupWithConfirmation(
  "#delete-confirmation-popup",
  async (cardId) => {
    try {
      await apiRequest.deleteCard(cardId);

      const cardElement = cardsMap.get(cardId);
      if (cardElement) {
        cardElement.remove();
        cardsMap.delete(cardId);
      }

      deleteConfirmationPopup.close();
    } catch (error) {
      console.error(error);
    }
  }
);
deleteConfirmationPopup.setEventListeners();

function createCard(cardData: CardData): HTMLElement {
  const card = new Card(
    cardData,
    "#card__template",
    (name, link) => {
      imagePopup.open(name, link);
    },
    (id) => {
      deleteConfirmationPopup.open(id);
    },
    async (id, isLiked) => {
      try {
        if (isLiked) {
          return await apiRequest.removeLike(id);
        }
  
        return await apiRequest.addLike(id);  
      } catch (error) {
        console.error(error);
      }
    }
  );

  const cardElement = card.generateCard();
  cardsMap.set(cardData._id, cardElement);

  return cardElement;
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

// Get user information and cards from API
(async function() {
  try {
    const [userData, initialCards] = await Promise.all([
      apiRequest.getUserInfo(),
      apiRequest.getCards()
    ]);

    userInfo.setUserInfo(
      {
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar
      }
    );

    cardList.setItems(initialCards);
    cardList.renderItems();

  } catch (error) {
    console.error(error);
  }
})();

const addCardPopup = new PopupWithForm("#new-card-popup", async (inputValues) => {
  try {
    const name = inputValues["place-name"];
    const link = inputValues.link;
  
    if (!name || !link) {
      return 
    }
  
    addCardSubmitBtn.textContent = "Creando...";
  
    const response = await apiRequest.addCard({
      name: name,
      link: link
    });
  
    const newCard = {
      _id: response._id,
      name: response.name,
      link: response.link,
      isLiked: response.isLiked
    }
  
    cardList.addItem(createCard(newCard));
    addCardPopup.close();

  } catch (error) {
    console.error(error);
  } finally {
    addCardSubmitBtn.textContent = "Crear";
  }
});
addCardPopup.setEventListeners();
// End Cards

// Start Profile Editing
const editProfilePopup = new PopupWithForm("#edit-popup", async (inputValues) => {
  try {
    const userName = inputValues.name;
    const userAbout = inputValues.description;
  
    if (!userName || !userAbout) {
      return;
    }

    editProfileSubmitBtn.textContent = "Guardando...";
  
    const response = await apiRequest.updateUserInfo({
      name: userName,
      about: userAbout
    });
    
    userInfo.setUserInfo({
      name: response.name,
      about: response.about,
      avatar: response.avatar
    });
  
    editProfilePopup.close();
    
  } catch (error) {
    console.error(error);  
  } finally {
    editProfileSubmitBtn.textContent = "Guardar";
  }
});
editProfilePopup.setEventListeners();

const editAvatarPopup = new PopupWithForm("#edit-avatar", async (inputValues) => {
  try {
    const userAvatar = inputValues.avatar;
  
    if (!userAvatar) {
      return 
    }

    editAvatarSubmitBtn.textContent = "Guardando...";
  
    const response = await apiRequest.updateAvatar({
      avatar: userAvatar
    });
  
    userInfo.setUserInfo({
      name: response.name,
      about: response.about,
      avatar: response.avatar
    });
    
    editAvatarPopup.close();
    
  } catch (error) {
    console.error(error);
  } finally {
    editAvatarSubmitBtn.textContent = "Guardar";
  }
});
editAvatarPopup.setEventListeners();
// End Profile Editing

// Start Popup Opening
addCardBtn.addEventListener("click", () => {
  addCardFormValidation.resetValidation()
  addCardPopup.open();
});

editProfileBtn.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();

  editProfileNameInput.value = name;
  editProfileDescriptionInput.value = about;

  editProfileFormValidation.resetValidation();
  editProfilePopup.open();
});

editAvatarBtn.addEventListener("click", () => {
  editAvatarFormValidation.resetValidation();
  editAvatarPopup.open();
})