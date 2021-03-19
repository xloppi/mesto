import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'

import {
  initialCards,
  settignsValidation,
  listCards,
  editProfileButton,
  addPlaceButton,
  formEditProfile,
  formAddPlace,
  nameInput,
  jobInput
} from '../utils/constants.js'

const formEditProfileValidation = new FormValidator(settignsValidation, formEditProfile);
const formAddPlaceValidation = new FormValidator(settignsValidation, formAddPlace);

const user = new UserInfo ({nameSelector: ".profile__title", jobSelector: ".profile__subtitle"});

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const elementcard = new Card(item, ".elements__card_template", handleCardClick);
    const htmlCard = elementcard.createCard();
    cardsList.addItem(htmlCard);
    },
  },
  listCards
);

const popupEditProfile = new PopupWithForm({
  handleFormSubmit: (formData) => {
    user.setUserInfo(formData);
  },
  popupSelector: ".popup_edit-profile"
});

const popupAddPlace = new PopupWithForm({
  handleFormSubmit: (formData) => {
    const elementcard = new Card(formData, ".elements__card_template", handleCardClick);
    const htmlCard = elementcard.createCard();
    cardsList.addItem(htmlCard);
  },
  popupSelector:".popup_add-place"
});

const popupViewing = new PopupWithImage(".popup_viewing-place-photo");

function handleCardClick (name, link) {
  popupViewing.open(name, link);
}

editProfileButton.addEventListener('click',() => {
  const userInfoInputs = user.getUserInfo();
  nameInput.value = userInfoInputs.name;
  jobInput.value = userInfoInputs.job;
  formEditProfileValidation.enableValidation();
  formEditProfileValidation.resetValidation();
  popupEditProfile.open();
})

addPlaceButton.addEventListener('click',() => {
  formAddPlaceValidation.enableValidation();
  formAddPlaceValidation.resetValidation();
  popupAddPlace.open();
});

cardsList.renderItems();
