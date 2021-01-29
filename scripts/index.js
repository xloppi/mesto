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
const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddPlace = document.querySelector(".popup_add-place");
const popupViewing = document.querySelector(".popup_viewing-place-photo");
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


function render() {
  initialCards.forEach(renderCard);
}

function renderCard (card) {
  const htmlCard = cardTemplate.cloneNode(true);
  htmlCard.querySelector(".elements__card-image").setAttribute("src", card.link);
  htmlCard.querySelector(".elements__card-image").setAttribute("alt", card.name);
  htmlCard.querySelector(".elements__card-title").innerText = card.name;
  htmlCard.querySelector(".elements__card-like-button").addEventListener('click',toggleLike);
  htmlCard.querySelector(".elements__card-delete-button").addEventListener('click',handledeleteCard);
  htmlCard.querySelector(".elements__card-image").addEventListener('click', () => popupViewingPlace(card));
  listCards.prepend(htmlCard);
}

function handledeleteCard (event) {
  event.target.closest('.elements__card').remove();
}

function toggleLike (event) {
  event.target.classList.toggle('elements__card-like-button_active');
}

function popupViewingPlace (card) {
  popupViewing.querySelector(".popup__photo-image").setAttribute("src", card.link);
  popupViewing.querySelector(".popup__photo-image").setAttribute("alt", card.name);
  popupViewing.querySelector(".popup__photo-caption").innerText = card.name;
  popupViewing.classList.toggle('popup_display_flex');
}

editProfileButton.addEventListener('click',() => togglePopup(popupEditProfile));
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

function handleEditProfileSubmit (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  togglePopup(popupEditProfile);
}

function handleAddPlaceSubmit (event) {
  event.preventDefault();
  let place = [];
  place.name = namePlaceInput.value;
  place.link = linkPlaceInput.value;
  renderCard (place);
  togglePopup(popupAddPlace);

}

function togglePopup (elem) {
  elem.classList.toggle('popup_display_flex');
    if (popupEditProfile.classList.contains('popup_display_flex')) {
      nameInput.value = profileTitle.textContent;
      jobInput.value = profileSubtitle.textContent;
    }
}

formEditProfile.addEventListener('submit', handleEditProfileSubmit);
formAddPlace.addEventListener('submit', handleAddPlaceSubmit);

render();



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
