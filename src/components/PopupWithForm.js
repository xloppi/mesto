import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit, popupSelector}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._handleFormSubmit = handleFormSubmit;
    this._formSubmit = this._formSubmit.bind(this)
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _formSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._formSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
