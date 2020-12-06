export class Card {
  constructor(placeName, placeLink, templateSelector, handleCardClick) {
    this._placeName = placeName;
    this._placeLink = placeLink;
    this._templateSelector = templateSelector;
    this._handleImgClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);
    return cardElement;
  }

  _handleDeleteClick() {
    this._place.remove();
  }

  _handleLikeClick() {
    this._place.querySelector('.place__like-button').classList.toggle('place__like-button_liked');
  }

  _setDeleteListener() {
    this._place.querySelector('.place__delete-button').addEventListener('click', () => {
      this._handleDeleteClick();
    });
  }

  _setLikeListener() {
    this._place.querySelector('.place__like-button').addEventListener('click', () => {
      this._handleLikeClick();
    });
  }

  _setImgListener() {
    this._place.querySelector('.place__img').addEventListener('click', () => {
      this._handleImgClick();
    });
  }

  createCard() {
    this._place = this._getTemplate();
    this._place.querySelector('.place__title').textContent = this._placeName;
    this._placeImageElement = this._place.querySelector('.place__img')
    this._placeImageElement.alt = this._placeName;
    this._placeImageElement.src = this._placeLink;

    this._setDeleteListener();
    this._setLikeListener();
    this._setImgListener();
    return this._place;
  }
}
