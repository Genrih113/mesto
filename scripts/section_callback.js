function renderer({name, link}, containerSelector) {
  const cardElement = document
    .querySelector(cardTemplate)
    .content
    .querySelector('.place')
    .cloneNode(true);
  cardElement.querySelector('.place__title').textContent = name;
  placeImageElement = cardElement.querySelector('.place__img');
  placeImageElement.alt = name;
  placeImageElement.src = link;
  containerSelector.prepend(cardElement);
}
