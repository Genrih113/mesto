//переменные отображаемые на странице
const personEditButton = document.querySelector('.person__edit-button');
const personName = document.querySelector('.person__name');
const personPassion = document.querySelector('.person__passion');

//переменные попапа редактирования профиля
const profilePopup = document.querySelector('.popup_profile');
const profilePopupCloseButton = document.querySelector('.popup__close_profile');
const profilePopupName = document.querySelector('.popup__name_profile');
const profilePopupPassion = document.querySelector('.popup__passion_profile');
const profilePopupForm = document.querySelector('.popup__container_profile');

const places = document.querySelector('.places');
const placeTemplate = document.querySelector('#place').content;

const placeAddButton = document.querySelector('.add-button');
const placePopup = document.querySelector('.popup_place');
const placePopupCloseButton = document.querySelector('.popup__close_place');
const placePopupName = document.querySelector('.popup__name_place');
const placePopupLink = document.querySelector('.popup__link_place');
const placePopupForm = document.querySelector('.popup__container_place');

const placeViewPopup = document.querySelector('.popup_place-view');
const placeViewPopupCloseButton = document.querySelector('.popup__close_place-view');

let placeName;
let placeLink;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function togglePopup(popupName) {
  popupName.classList.toggle('popup_opened');
}

function copyPersonInfoToPopup() {
  profilePopupName.value = personName.textContent;
  profilePopupPassion.value = personPassion.textContent;
}

function copyPersonInfoToPage(event) {
  event.preventDefault();
  personName.textContent = profilePopupName.value;
  personPassion.textContent = profilePopupPassion.value;
  togglePopup(profilePopup);
}

function insertPlaceCardInListTop(placeName, placeLink) {
  const place = placeTemplate.cloneNode(true);
  place.querySelector('.place__title').textContent = placeName;
  place.querySelector('.place__img').alt = placeName;
  place.querySelector('.place__img').src = placeLink;

  const placeDeleteButton = place.querySelector('.place__delete-button');
  placeDeleteButton.addEventListener('click', function deletePlaceCard() {
    placeDeleteButton.parentElement.remove();
  });

  const placeLikeButton = place.querySelector('.place__like-button');
  placeLikeButton.addEventListener('click', function likePlaceCard() {
    placeLikeButton.classList.toggle('place__like-button_liked');
  });

  const placeImageButton = place.querySelector('.place__img');
  placeImageButton.addEventListener('click', function viewPlaceCard() {
    placeViewPopup.classList.toggle('popup_opened');
    placeViewPopup.querySelector('.popup__place-image').src = placeLink;
    placeViewPopup.querySelector('.popup__place-caption').textContent = placeName;
  });

  places.prepend(place);
}

function insertNewPlaceCardFromPopup(event) {
  event.preventDefault();
  insertPlaceCardInListTop(placePopupName.value, placePopupLink.value);
  togglePopup(placePopup);
}

//размещение на странице карточек описанных в массиве объектов
for (let i = 0; i < initialCards.length; i++) {
  placeName = initialCards[i].name;
  placeLink = initialCards[i].link;
  insertPlaceCardInListTop(placeName, placeLink);
}


personEditButton.addEventListener('click', () => {
  if (profilePopup.classList.contains('popup_opened') === false) {
    copyPersonInfoToPopup();
  }
  togglePopup(profilePopup)});

profilePopupCloseButton.addEventListener('click', () => {
  togglePopup(profilePopup);
});

profilePopupForm.addEventListener('submit', copyPersonInfoToPage);

profilePopup.addEventListener('click', () => {
  if (event.target !== event.currentTarget) {
    return;
  }
  togglePopup(profilePopup);
});


placeAddButton.addEventListener('click', () => {
  togglePopup(placePopup);
  placePopupName.value = '';
  placePopupLink.value = '';
});

placePopupCloseButton.addEventListener('click', () => {togglePopup(placePopup)});

placePopupForm.addEventListener('submit', insertNewPlaceCardFromPopup);

placePopup.addEventListener('click', () => {
  if (event.target !== event.currentTarget) {
    return;
  }
  togglePopup(placePopup);
});


placeViewPopupCloseButton.addEventListener('click', () => {
  togglePopup(placeViewPopup);
});

placeViewPopup.addEventListener('click', () => {
  if (event.target !== event.currentTarget) {
    return;
  }
  togglePopup(placeViewPopup);
});


//реализация "общей" кнопки закрытия попапов
/*
let closeBtn = document.querySelectorAll('.popup__close');
console.log(closeBtn);
console.log(closeBtn[0].parentElement.parentElement);
for (let i = 0; i < closeBtn.length; i++) {
  closeBtn[i].addEventListener('click', () => {
    togglePopup(closeBtn[i].closest('.popup_place'));
  });
};
*/
