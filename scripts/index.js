let openButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close");

function togglePopup () {
  popup.classList.toggle('popup_display_flex');
}

openButton.addEventListener('click',togglePopup)
closeButton.addEventListener('click',togglePopup)

popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
})
