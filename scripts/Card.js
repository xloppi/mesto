export class Card {
  _template
  _nameCard
  _urlCard

  constructor(name, url, template, popupViewingPlace) {
    this._template = document.querySelector(template);
    this._nameCard = name;
    this._urlCard = url;
    this._popupViewingPlace = popupViewingPlace;
  }

  _getTemplateCard() {
    const cardElement = this._template.content.cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._htmlCard = this._getTemplateCard();
    this._setEventListeners();
    this._htmlCard.querySelector(".elements__card-image").src = this._urlCard;
    this._htmlCard.querySelector(".elements__card-image").alt = this._nameCard;
    this._htmlCard.querySelector(".elements__card-title").innerText = this._nameCard;
    return this._htmlCard
  }

  _setEventListeners() {
    this._htmlCard.querySelector(".elements__card-like-button").addEventListener('click', () => {
      this._toggleLike();
    });
    this._htmlCard.querySelector(".elements__card-delete-button").addEventListener('click', () => {
      this._handledeleteCard();
    });
    this._htmlCard.querySelector(".elements__card-image").addEventListener('click', () => {
      this._popupViewingPlace(this._nameCard, this._urlCard);
    });
  }

  _toggleLike (event) {
    event.target.classList.toggle('elements__card-like-button_active');
  }

  _handledeleteCard (event) {
    event.target.closest('.elements__card').remove();
  }
}
