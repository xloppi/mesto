export default class Card {
  constructor(card, userId, template, handleCardClick, handleCardDelete, handleCardLike) {
    this._template = document.querySelector(template);
    this._nameCard = card.name;
    this._urlCard = card.link;
    this._likesCard = card.likes;
    this._ownerCardId = card.owner._id;
    this._cardId = card._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  _getTemplateCard() {
    return this._template.content.cloneNode(true).children[0];
  }

  setLikes(data) {
    this._likesCard = data.likes;
  }

  isOwnerLiked() {
    this._likes = Array.from(this._likesCard).map(function (user) {return user._id;});
    if (this._likes.includes(this._userId)) {
      return true
    } else {
      return false
    }
  }

  like() {
    this._toggleLike();
    this._cardLikesCounter.textContent = this._likesCard.length;
  }

  _isLiked() {
    this._likesCard.forEach( element => {
      if (element._id === this._userId)
      this._toggleLike();
    })
  }

  _isOwner() {
    if (this._userId !== this._ownerCardId ) {
      this._cardDeleteButton.remove();
    }
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => this._handleCardLike(this));
    this._cardDeleteButton.addEventListener('click', () => {
      this._handleCardDelete(this);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._nameCard, this._urlCard);
    });
  }

  createCard() {
    this._htmlCard = this._getTemplateCard();
    this._cardDeleteButton = this._htmlCard.querySelector(".elements__card-delete-button");
    this._cardLikeButton = this._htmlCard.querySelector(".elements__card-like-button")
    this._isOwner(this._userId);
    this._isLiked();
    this._cardImage = this._htmlCard.querySelector(".elements__card-image");
    this._cardLikesCounter = this._htmlCard.querySelector(".elements__card-like-counter");
    this._cardLikesCounter.textContent = this._likesCard.length;
    this._cardImage.src = this._urlCard;
    this._cardImage.alt = this._nameCard;
    this._htmlCard.querySelector(".elements__card-title").textContent = this._nameCard;
    this._setEventListeners();
    return this._htmlCard
  }

  _toggleLike () {
    this._cardLikeButton.classList.toggle('elements__card-like-button_active');
  }

  removeCard() {
    this._htmlCard.remove();
    this._htmlCard = null;
  }
}
