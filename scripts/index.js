import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import Section from './Section.js'
import PopupWithForm from './PopupWithForm.js'
import PopupWithImage from './PopupWithImage.js'

import {
  initialCards,
  settignsValidation,
  listCards
} from '../utils/constants.js'




const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
/*const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddPlace = document.querySelector(".popup_add-place");
const popupViewing = document.querySelector(".popup_viewing-place-photo");
const popupViewingPhoto = popupViewing.querySelector(".popup__photo-image");
const popupViewingCaption = popupViewing.querySelector(".popup__photo-caption");*/
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const formEditProfile = document.querySelector(".popup__form_profile-edit");
const formAddPlace = document.querySelector(".popup__form_add-place");
//const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
//const jobInput = popupEditProfile.querySelector(".popup__input_type_job");
//const namePlaceInput = popupAddPlace.querySelector(".popup__input_type_place");
//const linkPlaceInput = popupAddPlace.querySelector(".popup__input_type_link");
const popups = document.querySelectorAll('.popup')

const formEditProfileValidation = new FormValidator(settignsValidation, formEditProfile);
const formAddPlaceValidation = new FormValidator(settignsValidation, formAddPlace);

//попапы нужно создать только один раз

const popupEditProfile = new PopupWithForm(".popup_edit-profile");
const popupAddPlace = new PopupWithForm(".popup_add-place");
const popupViewing = new PopupWithImage(".popup_viewing-place-photo");

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

function handleCardClick (name, link) {
  popupViewing.open(name, link);
  popupViewing.setEventListeners();
}

function handleEditProfileSubmit (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleAddPlaceSubmit (event) {
  event.preventDefault();
  const place = {};
  place.name = namePlaceInput.value;
  place.link = linkPlaceInput.value;
  namePlaceInput.value = '';
  linkPlaceInput.value = '';
  renderCard (place);
  closePopup(popupAddPlace);

}

editProfileButton.addEventListener('click',() => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  formEditProfileValidation.enableValidation();
  formEditProfileValidation.resetValidation();
})

addPlaceButton.addEventListener('click',() => {
  formAddPlaceValidation.enableValidation();
  formAddPlaceValidation.resetValidation();
  openPopup(popupAddPlace);
});

/*function PopupsClose() {
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_display_flex')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup);
        }
    });
  });
}

PopupsClose();*/



formEditProfile.addEventListener('submit', handleEditProfileSubmit);
formAddPlace.addEventListener('submit', handleAddPlaceSubmit);

/*function closePopupEscButton (event) {
  if (event.keyCode === 27) {
    closePopup (document.querySelector('.popup_display_flex'));
  }
}*/

/*function openPopup (popup) {
  popup.classList.add('popup_display_flex');
  document.addEventListener('keydown', closePopupEscButton);
}

function closePopup (popup) {
  popup.classList.remove('popup_display_flex');
  document.removeEventListener('keydown', closePopupEscButton);
}*/

cardsList.renderItems();
