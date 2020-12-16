export class Card {
  constructor(
    placeName,
    placeLink,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    imageId,
    numberOfLikes,
    isItMyCard,
    doILikedCard)
    {
    this._placeName = placeName;
    this._placeLink = placeLink;
    this._templateSelector = templateSelector;
    this._handleImgClick = handleCardClick;
    this._numberOfLikes = numberOfLikes;
    this._isItMyCard = isItMyCard;
    this._handleDeleteClick = handleDeleteClick;
    this._imageId = imageId;
    this._doILikedCard = doILikedCard;
    this._handleToggleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);
    return cardElement;
  }

    getImageId() {
    return this._imageId;
  }

  _handleLikeClick() {
    this._handleToggleLikeClick();
    this._doILikedCard = !this._doILikedCard;
  }

  _setDeleteListener() {
    this._placeDeleteButton.addEventListener('click', () => {
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
    this._placeDeleteButton = this._place.querySelector('.place__delete-button');
    this._placeLikeButton = this._place.querySelector('.place__like-button');
    this._placeLikeCounter = this._place.querySelector('.place__like-counter');
    this._placeImageElement = this._place.querySelector('.place__img');
    this._placeTitle = this._place.querySelector('.place__title');

    if (!this._isItMyCard) {
      this._placeDeleteButton.classList.add('place__delete-button_invisible');
    }
    if (this._doILikedCard) {
      this._placeLikeButton.classList.add('place__like-button_liked');
    }
    this._placeTitle.textContent = this._placeName;
    this._placeImageElement.alt = this._placeName;
    this._placeImageElement.src = this._placeLink;
    this._placeLikeCounter.textContent = this._numberOfLikes;

    this._setDeleteListener();
    this._setLikeListener();
    this._setImgListener();
    return this._place;
  }
}
