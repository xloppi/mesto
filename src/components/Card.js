export default class Card {
  constructor(card, template, handleCardClick, handleCardDelete, api) {
    this._template = document.querySelector(template);
    this._nameCard = card.name;
    this._urlCard = card.link;
    this._likesCard = card.likes;
    this._ownerCardId = card.owner._id;
    this._cardId = card._id;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._api = api;
  }

  _getTemplateCard() {
    const cardElement = this._template.content.cloneNode(true);
    return cardElement;
  }

  _isOwner(userId) {
    if (userId !== this._ownerCardId ) {
      this._cardDeleteButton.remove()
    }
  }

  createCard(userId) {
    this._htmlCard = this._getTemplateCard();
    this._cardDeleteButton = this._htmlCard.querySelector(".elements__card-delete-button");
    this._isOwner(userId);
    this._cardImage = this._htmlCard.querySelector(".elements__card-image");
    this._cardLikesCounter = this._htmlCard.querySelector(".elements__card-like-counter");
    this._cardLikesCounter.textContent = this._likesCard.length;
    this._cardImage.src = this._urlCard;
    this._cardImage.alt = this._nameCard;
    this._setEventListeners();
    this._htmlCard.querySelector(".elements__card-title").textContent = this._nameCard;
    return this._htmlCard
  }

  _setEventListeners() {
    this._htmlCard.querySelector(".elements__card-like-button").addEventListener('click', this._toggleLike);
    this._cardDeleteButton.addEventListener('click', () => this._handleCardDelete(this));
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._nameCard, this._urlCard);
    });
  }

  _toggleLike (event) {
    event.target.classList.toggle('elements__card-like-button_active');
  }

  removeCard() {
    this._htmlCard.remove();
  }
}
