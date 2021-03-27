import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor({handleSubmit, popupSelector}) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector('.popup__submit');
    this._handleSubmit = handleSubmit;
  }

  setSubmitAction(card) {
    this._card = card;
  }

  getCardId() {
    return this._card._cardId
  }

  getCard() {
    return this._card
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', this._handleSubmit);
  }

}
