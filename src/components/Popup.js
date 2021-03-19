export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector(".popup__close")
  }

  open() {
    this._popup.classList.add('popup_display_flex');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_display_flex');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
      if (evt.keyCode === 27) {
        this.close();
      }
    }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
  }

}
