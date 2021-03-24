export const options = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-21/cards',
  headers: {
    authorization: '05ac8eb6-b294-43cf-aca3-fbe4159ad85f',
    'Content-Type': 'application/json',
  }
}

export const settignsValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const listCards = ".elements__cards";
export const editProfileButton = document.querySelector(".profile__edit-button");
export const addPlaceButton = document.querySelector(".profile__add-button");
export const formEditProfile = document.querySelector(".popup__form_profile-edit");
export const formAddPlace = document.querySelector(".popup__form_add-place");
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_job");
