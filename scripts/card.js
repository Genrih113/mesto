class Card {
  constructor(placeName, placeLink) {
    this.placeName = placeName;
    this.placeLink = placeLink;
  }

  createCard() {
    const placeTemplate = document.querySelector('#place').content;
    const place = placeTemplate.cloneNode(true);
    const placeImageButton = place.querySelector('.place__img');
    place.querySelector('.place__title').textContent = this.placeName;
    placeImageButton.alt = this.placeName;
    placeImageButton.src = this.placeLink;

    const placeDeleteButton = place.querySelector('.place__delete-button');
    placeDeleteButton.addEventListener('click', function deletePlaceCard() {
      placeDeleteButton.parentElement.remove();
    });

    const placeLikeButton = place.querySelector('.place__like-button');
    placeLikeButton.addEventListener('click', function likePlaceCard() {
      placeLikeButton.classList.toggle('place__like-button_liked');
    });

    placeImageButton.addEventListener('click', function viewPlaceCard() {
      placeViewPopup.querySelector('.popup__place-image').src = this.placeLink;
      placeViewPopup.querySelector('.popup__place-caption').textContent = this.placeName;
      togglePopup(placeViewPopup);
    });
    return place;
  }
}
