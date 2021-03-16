import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import  Section  from './Section.js'

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

const settignsValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const listCards = ".elements__cards";
const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddPlace = document.querySelector(".popup_add-place");
const popupViewing = document.querySelector(".popup_viewing-place-photo");
const popupViewingPhoto = popupViewing.querySelector(".popup__photo-image");
const popupViewingCaption = popupViewing.querySelector(".popup__photo-caption");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const formEditProfile = popupEditProfile.querySelector(".popup__form_profile-edit");
const formAddPlace = popupAddPlace.querySelector(".popup__form_add-place");
const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
const jobInput = popupEditProfile.querySelector(".popup__input_type_job");
const namePlaceInput = popupAddPlace.querySelector(".popup__input_type_place");
const linkPlaceInput = popupAddPlace.querySelector(".popup__input_type_link");
const popups = document.querySelectorAll('.popup')

const formEditProfileValidation = new FormValidator(settignsValidation, formEditProfile);
const formAddPlaceValidation = new FormValidator(settignsValidation, formAddPlace);

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const elementcard = new Card(item, ".elements__card_template", popupViewingPlace);
    const htmlCard = elementcard.createCard();
    cardsList.addItem(htmlCard);
    },
  },
  listCards
);


/*function render() {
  initialCards.forEach(renderCard);
}

function renderCard (card) {
  const elementcard = new Card(card, ".elements__card_template", popupViewingPlace);
  const htmlCard = elementcard.createCard();
  listCards.prepend(htmlCard);
}*/

function popupViewingPlace (name, link) {
  popupViewingPhoto.setAttribute("src", link);
  popupViewingPhoto.setAttribute("alt", name);
  popupViewingCaption.innerText = name;
  openPopup(popupViewing);
}

editProfileButton.addEventListener('click',() => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  formEditProfileValidation.enableValidation();
  formEditProfileValidation.resetValidation();
  openPopup(popupEditProfile);
})

addPlaceButton.addEventListener('click',() => {
  formAddPlaceValidation.enableValidation();
  formAddPlaceValidation.resetValidation();
  openPopup(popupAddPlace);
});

function PopupsClose() {
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

PopupsClose();

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

formEditProfile.addEventListener('submit', handleEditProfileSubmit);
formAddPlace.addEventListener('submit', handleAddPlaceSubmit);

function closePopupEscButton (event) {
  if (event.keyCode === 27) {
    closePopup (document.querySelector('.popup_display_flex'));
  }
}

/*function togglePopup (elem) {
  elem.classList.toggle('popup_display_flex');
  if (elem.classList.contains('popup_display_flex')) {
    document.addEventListener('keydown', closePopupEscButton);
  } else {
    document.removeEventListener('keydown', closePopupEscButton);
  }
}*/

function openPopup (popup) {
  popup.classList.add('popup_display_flex');
  document.addEventListener('keydown', closePopupEscButton);
}

function closePopup (popup) {
  popup.classList.remove('popup_display_flex');
  document.removeEventListener('keydown', closePopupEscButton);
}

cardsList.renderItems();
