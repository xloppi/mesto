let openButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let formElement = popup.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__fieldset-name");
let jobInput = formElement.querySelector(".popup__fieldset-job");

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
