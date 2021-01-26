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
let openButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let formElement = popup.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput = formElement.querySelector(".popup__input_type_job");


function togglePopup () {
  popup.classList.toggle('popup_display_flex');

  if (popup.classList.contains('popup_display_flex')) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
}

openButton.addEventListener('click',togglePopup)
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

formElement.addEventListener('submit', handleFormSubmit);

//код проектной работы №5

function render() {
  initialCards.forEach(renderCard);
}

function renderCard (card) {
  const htmlCard = cardTemplate.cloneNode(true);
  htmlCard.querySelector(".elements__card-image").setAttribute("src", card.link);
  htmlCard.querySelector(".elements__card-title").innerText = card.name;
  listCards.appendChild(htmlCard);
}

render();
