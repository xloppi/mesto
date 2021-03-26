import './index.css'
import Api from '../components/Api.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithSubmit from '../components/PopupWithSubmit.js'
import UserInfo from '../components/UserInfo.js'

import {
  options,
  settignsValidation,
  listCards,
  editProfileButton,
  addPlaceButton,
  editAvatarButton,
  formEditProfile,
  formAddPlace,
  formEditAvatar,
  nameInput,
  aboutInput,
  submitAddPlaceButton
} from '../utils/constants.js'

let userId = '';

const formEditProfileValidation = new FormValidator(settignsValidation, formEditProfile);
formEditProfileValidation.enableValidation();
const formAddPlaceValidation = new FormValidator(settignsValidation, formAddPlace);
formAddPlaceValidation.enableValidation();
const formEditAvatarPlaceValidation = new FormValidator(settignsValidation, formEditAvatar);
formEditAvatarPlaceValidation.enableValidation();

const api = new Api(options);

const user = new UserInfo ({nameSelector: ".profile__title", jobSelector: ".profile__subtitle", avatarSelector: ".profile__avatar"});

const cardsList = new Section({
  renderer: (item) => {
    cardsList.addItem(generateCard(item));
    },
  },
  listCards,
);

const popupSubmitDelete = new PopupWithSubmit({
  handleSubmit: () => {
    const card = popupSubmitDelete._card;
    api.deletePlaceTask(card._cardId)
      .then(() =>{
        popupSubmitDelete.close();
        card.removeCard();})
      .catch((err) => {
        console.log('Ошибка: ', err);
      });
  },
  popupSelector:".popup_submit-delete"
 });

 popupSubmitDelete.setEventListeners();

 function handleCardClick(name, link) {
  popupViewing.open(name, link);
}

function handleCardDelete(card) {
  popupSubmitDelete.setSubmitAction(card)
  popupSubmitDelete.open();
}

function handleCardLike(card) {
  if (card.isOwnerLiked()) {
    api.deleteLikeTask(card._cardId)
      .then((res) => {
        card.setLikes(res);
        card.like();
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      });
  } else {
    api.putLikeTask(card._cardId)
      .then((res) => {
        card.setLikes(res);
        card.like();
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      });
  }
}

function generateCard(item) {
  const elementcard = new Card(item, userId, ".elements__card_template", handleCardClick, handleCardDelete, handleCardLike);
  return elementcard.createCard();
}

api.getInitialCards()
  .then(data => {
    cardsList.renderItems(data.reverse());
  })
  .catch((err) => {
    console.log('Ошибка: ', err);
  });


api.getUserInfo()
  .then(res => {
    user.setUserInfo(res);
    userId = res._id;
  })
  .catch((err) => {
    console.log('Ошибка: ', err);
  });

const popupEditProfile = new PopupWithForm({
  handleFormSubmit: (formData) => {
    api.editProfileTask(formData)
      .then(formData => {
        user.setUserInfo(formData)
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      })
  },
  popupSelector: ".popup_edit-profile"
});

popupEditProfile.setEventListeners();

const popupAddPlace = new PopupWithForm({
  handleFormSubmit: (formData) => {
    submitAddPlaceButton.textContent = 'Сохранение...'
    api.addPlaceTask(formData)
      .then((res) => {
        cardsList.addItem(generateCard(res));
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      })
      .finally(() => {
        submitAddPlaceButton.textContent = 'Создать'
      })
  },
  popupSelector:".popup_add-place"
});

popupAddPlace.setEventListeners();

const popupEditAvatar = new PopupWithForm({
  handleFormSubmit: (formData) => {
    api.editAvatarTask(formData)
      .then((res) => {
        user.setUserAvatar(res);
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      })
  },
  popupSelector:".popup_update-avatar"
});

popupEditAvatar.setEventListeners();

const popupViewing = new PopupWithImage(".popup_viewing-place-photo");

popupViewing.setEventListeners();

editProfileButton.addEventListener('click',() => {
  const userInfoInputs = user.getUserInfo();
  nameInput.value = userInfoInputs.name;
  aboutInput.value = userInfoInputs.about;
  formEditProfileValidation.resetValidation();
  popupEditProfile.open();
})

addPlaceButton.addEventListener('click',() => {
  formAddPlaceValidation.resetValidation();
  popupAddPlace.open();
});

editAvatarButton.addEventListener('click',() => {
  formEditAvatarPlaceValidation.resetValidation();
  popupEditAvatar.open();
});
