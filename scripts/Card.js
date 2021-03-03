export class Card {
  _template
  _nameCard
  _urlCard

  constructor(card, template, popupViewingPlace) {
    this._template = document.querySelector(template);
    this._nameCard = card.name;
    this._urlCard = card.link;
    this._popupViewingPlace = popupViewingPlace;
  }

  _getTemplateCard() {
    const cardElement = this._template.content.cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._htmlCard = this._getTemplateCard();
    this._cardImage = this._htmlCard.querySelector(".elements__card-image");
    this._cardImage.src = this._urlCard;
    this._cardImage.alt = this._nameCard;
    this._setEventListeners();
    this._htmlCard.querySelector(".elements__card-title").innerText = this._nameCard;
    return this._htmlCard
  }

  _setEventListeners() {
    this._htmlCard.querySelector(".elements__card-like-button").addEventListener('click', this._toggleLike);
    this._htmlCard.querySelector(".elements__card-delete-button").addEventListener('click', this._handledeleteCard);
    this._cardImage.addEventListener('click', () => {
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
