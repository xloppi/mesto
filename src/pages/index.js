import './index.css'
import Api from '../components/Api.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'

import {
  options,
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
formEditProfileValidation.enableValidation();
const formAddPlaceValidation = new FormValidator(settignsValidation, formAddPlace);
formAddPlaceValidation.enableValidation();

const api = new Api(options);

const user = new UserInfo ({nameSelector: ".profile__title", jobSelector: ".profile__subtitle"});

function handleCardClick (name, link) {
  popupViewing.open(name, link);
}

function generateCard(item) {
  const elementcard = new Card(item, ".elements__card_template", handleCardClick);
  return elementcard.createCard();
}

api.getInitialCards()
  .then(data => {
    console.log(data);
    const cardsList = new Section({
      items: data,
      renderer: (item) => {
        cardsList.addItem(generateCard(item));
        },
      },
      listCards
    );
    cardsList.renderItems();
  })

const popupEditProfile = new PopupWithForm({
  handleFormSubmit: (formData) => {
    user.setUserInfo(formData);
  },
  popupSelector: ".popup_edit-profile"
});

popupEditProfile.setEventListeners();

const popupAddPlace = new PopupWithForm({
  handleFormSubmit: (formData) => {
    cardsList.addItem(generateCard(formData));
  },
  popupSelector:".popup_add-place"
});

popupAddPlace.setEventListeners();

const popupViewing = new PopupWithImage(".popup_viewing-place-photo");

popupViewing.setEventListeners();

editProfileButton.addEventListener('click',() => {
  const userInfoInputs = user.getUserInfo();
  nameInput.value = userInfoInputs.name;
  jobInput.value = userInfoInputs.job;
  formEditProfileValidation.resetValidation();
  popupEditProfile.open();
})

addPlaceButton.addEventListener('click',() => {
  formAddPlaceValidation.resetValidation();
  popupAddPlace.open();
});

