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
  submitAddPlaceButton,
  submitEditProfileButton,
  submitEditAvatarButton,
  submitDeleteCardButton
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
    submitDeleteCardButton.textContent = 'Удаление...'
    const card = popupSubmitDelete.getCard();
    api.deletePlaceTask(popupSubmitDelete.getCardId())
      .then(() =>{
        popupSubmitDelete.close();
        card.removeCard();
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      })
      .finally(() => {
        submitDeleteCardButton.textContent = 'Да'
      })
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

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(data => {
    user.setUserInfo(data[1]);
    userId = data[1]._id;
    cardsList.renderItems(data[0].reverse());
  })
  .catch((err) => {
    console.log('Ошибка: ', err);
  });

const popupEditProfile = new PopupWithForm({
  handleFormSubmit: (formData) => {
    submitEditProfileButton.textContent = 'Сохранение...'
    api.editProfileTask(formData)
      .then(formData => {
        user.setUserInfo(formData)
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      })
      .finally(() => {
        submitEditProfileButton.textContent = 'Сохранить'
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
        popupAddPlace.close();
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
    submitEditAvatarButton.textContent = 'Сохранение...'
    api.editAvatarTask(formData)
      .then((res) => {
        user.setUserAvatar(res);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      })
      .finally(() => {
        submitEditAvatarButton.textContent = 'Сохранить'
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

/*api.getInitialCards()
  .then(data => {
    cardsList.renderItems(data.reverse());
    console.log(data.reverse())
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
  });*/
