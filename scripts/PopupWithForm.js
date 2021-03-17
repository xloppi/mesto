import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  //Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleSubmit = handleSubmit;
  }

  //Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {

  }
//Перезаписывает родительский метод setEventListeners.
//Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия,
// но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this.addEventListener('submit', this._handleSubmit.bind(this));
  }
//Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();

  }
}