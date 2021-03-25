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

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => {
      this._handleSubmit(this._card);
    });
  }

}
