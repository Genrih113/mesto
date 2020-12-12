export class Card {
  constructor(placeName, placeLink, templateSelector, handleCardClick, handleDeleteClick, imageId, numberOfLikes, isItMyCard, doILikedCard) {
    this._placeName = placeName;
    this._placeLink = placeLink;
    this._templateSelector = templateSelector;
    this._handleImgClick = handleCardClick;
    this._numberOfLikes = numberOfLikes;
    this._isItMyCard = isItMyCard;
    this._handleDeleteClick = handleDeleteClick;
    this._imageId = imageId;
    this._doILikedCard = doILikedCard;
    //this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);
    return cardElement;
  }

  // _handleDeleteClick() {
  //   this._place.remove();

  // }

  getImageId() {
    return this._imageId;
  }

  _handleLikeClick() {
  //  this._place.querySelector('.place__like-button').classList.toggle('place__like-button_liked');
  //}
    if (!this._doILikedCard) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/' + this._imageId, {
    method: 'PUT',
    headers: {
      authorization: '7d3b332b-dc1e-49e3-90aa-8e33833ea304',
      'Content-Type': 'application/json'
    }
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      this._place.querySelector('.place__like-button').classList.add('place__like-button_liked');
      this._place.querySelector('.place__like-counter').textContent = result.likes.length;
      this._doILikedCard = !this._doILikedCard;
    });} else {
      fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/' + this._imageId, {
    method: 'DELETE',
    headers: {
      authorization: '7d3b332b-dc1e-49e3-90aa-8e33833ea304',
      'Content-Type': 'application/json'
    }
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      this._place.querySelector('.place__like-button').classList.remove('place__like-button_liked');
      this._place.querySelector('.place__like-counter').textContent = result.likes.length;
      this._doILikedCard = !this._doILikedCard;
    })
    }
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
    if (!this._isItMyCard) {
      this._place.querySelector('.place__delete-button').classList.add('place__delete-button_invisible');
    }
    if (this._doILikedCard) {
      this._place.querySelector('.place__like-button').classList.add('place__like-button_liked');
    }
    this._place.querySelector('.place__title').textContent = this._placeName;
    this._placeImageElement = this._place.querySelector('.place__img');
    this._placeImageElement.alt = this._placeName;
    this._placeImageElement.src = this._placeLink;
    this._place.querySelector('.place__like-counter').textContent = this._numberOfLikes;

    this._setDeleteListener();
    this._setLikeListener();
    this._setImgListener();
    return this._place;
  }
}
