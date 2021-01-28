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

const cardTemplate = document.querySelector(".elements__card_template").content;
const listCards = document.querySelector(".elements__cards");
let editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddPlace = document.querySelector(".popup_add-place");
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close");
const editProfileCloseButton = popupEditProfile.querySelector(".popup__close_edit-profile");
const addPlaceCloseButton = popupAddPlace.querySelector(".popup__close_add-place");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
/*let formElement = popup.querySelector(".popup__form");*/
const formEditProfile = popupEditProfile.querySelector(".popup__form_profile-edit");
const formAddPlace = popupAddPlace.querySelector(".popup__form_add-place");
let nameInput = popupEditProfile.querySelector(".popup__input_type_name");
let jobInput = popupEditProfile.querySelector(".popup__input_type_job");
const namePlaceInput = popupAddPlace.querySelector(".popup__input_type_place");
const linkPlaceInput = popupAddPlace.querySelector(".popup__input_type_link");


/*function togglePopup () {
  popup.classList.toggle('popup_display_flex');

  if (popup.classList.contains('popup_display_flex')) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
}

editProfileButton.addEventListener('click',togglePopup)
addPlaceButton.addEventListener('click',togglePopup)
closeButton.addEventListener('click',togglePopup)

popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
})


function handleFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    togglePopup ();
}

formElement.addEventListener('submit', handleFormSubmit);*/

//код проектной работы №5

function render() {
  initialCards.forEach(renderCard);
}

function renderCard (card) {
  const htmlCard = cardTemplate.cloneNode(true);
  htmlCard.querySelector(".elements__card-image").setAttribute("src", card.link);
  htmlCard.querySelector(".elements__card-title").innerText = card.name;
  htmlCard.querySelector(".elements__card-like-button").addEventListener('click',toggleLike)
  htmlCard.querySelector(".elements__card-delete-button").addEventListener('click',deleteCard)
  listCards.prepend(htmlCard);
}

function deleteCard(event) {
  event.target.closest('.elements__card').remove();
}

function toggleLike(event) {
  event.target.classList.toggle('elements__card-like-button_active');
}

function toggle (elem) {
  elem.classList.toggle('popup_display_flex');
}

function togglePopupEditProfile () {
  toggle (popupEditProfile);
  if (popupEditProfile.classList.contains('popup_display_flex')) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
}

function togglePopupAddPlace () {
  toggle (popupAddPlace);
}

editProfileButton.addEventListener('click',togglePopupEditProfile);
addPlaceButton.addEventListener('click',togglePopupAddPlace);
editProfileCloseButton.addEventListener('click',togglePopupEditProfile);
addPlaceCloseButton.addEventListener('click',togglePopupAddPlace);


popupEditProfile.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopupEditProfile();
  }
})

popupAddPlace.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopupAddPlace();
  }
})

function handleEditProfileSubmit (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  togglePopupEditProfile ();
}

function handleAddPlaceSubmit (event) {
  event.preventDefault();
  let place = [];
  place.name = namePlaceInput.value;
  place.link = linkPlaceInput.value;
  renderCard (place);
  togglePopupAddPlace ();

}

formEditProfile.addEventListener('submit', handleEditProfileSubmit);
formAddPlace.addEventListener('submit', handleAddPlaceSubmit);

render();
