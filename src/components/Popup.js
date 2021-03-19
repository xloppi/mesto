export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector(".popup__close");
    this._handleEscClose = this._handleEscClose.bind(this);
    this._ESC_BUTTON_CODE = 27;
  }

  open() {
    this._popup.classList.add('popup_display_flex');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_display_flex');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
      if (evt.keyCode === this._ESC_BUTTON_CODE) {
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
