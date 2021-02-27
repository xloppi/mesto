import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const listCards = document.querySelector(".elements__cards");
const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddPlace = document.querySelector(".popup_add-place");
const popupViewing = document.querySelector(".popup_viewing-place-photo");
const popupViewingPhoto = popupViewing.querySelector(".popup__photo-image");
const popupViewingCaption = popupViewing.querySelector(".popup__photo-caption");
const editProfileCloseButton = popupEditProfile.querySelector(".popup__close_edit-profile");
const addPlaceCloseButton = popupAddPlace.querySelector(".popup__close_add-place");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const formEditProfile = popupEditProfile.querySelector(".popup__form_profile-edit");
const formAddPlace = popupAddPlace.querySelector(".popup__form_add-place");
const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
const jobInput = popupEditProfile.querySelector(".popup__input_type_job");
const namePlaceInput = popupAddPlace.querySelector(".popup__input_type_place");
const linkPlaceInput = popupAddPlace.querySelector(".popup__input_type_link");

const settignsValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

function render() {
  initialCards.forEach(renderCard);
}

function renderCard (card) {
  const elementcard = new Card(card, ".elements__card_template", popupViewingPlace);
  const htmlCard = elementcard.createCard();
  listCards.prepend(htmlCard);
}

function popupViewingPlace (name, link) {
  popupViewingPhoto.setAttribute("src", link);
  popupViewingPhoto.setAttribute("alt", name);
  popupViewingCaption.innerText = name;
  togglePopup(popupViewing);
}

editProfileButton.addEventListener('click',() => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  togglePopup(popupEditProfile);
})

addPlaceButton.addEventListener('click',() => togglePopup(popupAddPlace));
editProfileCloseButton.addEventListener('click',() => togglePopup(popupEditProfile));
addPlaceCloseButton.addEventListener('click',() => togglePopup(popupAddPlace));
popupViewing.querySelector(".popup__close_place-photo").addEventListener('click', () => togglePopup(popupViewing))

popupEditProfile.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup(popupEditProfile);
  }
})

popupAddPlace.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup(popupAddPlace);
  }
})

popupViewing.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup(popupViewing);
  }
})

function handleEditProfileSubmit (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  togglePopup(popupEditProfile);
}

function handleAddPlaceSubmit (event) {
  event.preventDefault();
  const place = {};
  place.name = namePlaceInput.value;
  place.link = linkPlaceInput.value;
  namePlaceInput.value = '';
  linkPlaceInput.value = '';
  renderCard (place);
  togglePopup(popupAddPlace);

}

function closePopupEscButton (event) {
  if (event.keyCode === 27) {
    togglePopup (document.querySelector('.popup_display_flex'));
  }
}

function togglePopup (elem) {
  elem.classList.toggle('popup_display_flex');
  if (elem.classList.contains('popup_display_flex')) {
    document.addEventListener('keydown', closePopupEscButton);
  } else {
    document.removeEventListener('keydown', closePopupEscButton);
  }
}

formEditProfile.addEventListener('submit', handleEditProfileSubmit);
formAddPlace.addEventListener('submit', handleAddPlaceSubmit);

function validation() {
  const formList = Array.from(document.querySelectorAll(settignsValidation.formSelector));
  formList.forEach(formValidation)
}

function formValidation (formElement) {
  const validation = new FormValidator(settignsValidation, formElement);
  validation.enableValidation();
}

validation();
render();
