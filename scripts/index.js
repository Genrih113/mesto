import {Card} from './card.js';

import {FormValidator} from './validate.js';

export {placeViewPopup, togglePopup};

//переменные отображаемые на странице
const personEditButton = document.querySelector('.person__edit-button');
const personName = document.querySelector('.person__name');
const personPassion = document.querySelector('.person__passion');
const placeAddButton = document.querySelector('.add-button');

//переменные попапа редактирования профиля
const profilePopup = document.querySelector('.popup_profile');
const profilePopupCloseButton = document.querySelector('.popup__close_profile');
const profilePopupName = document.querySelector('.popup__name_profile');
const profilePopupPassion = document.querySelector('.popup__passion_profile');
const profilePopupForm = document.querySelector('.popup__container_profile');

//переменные-ссылки для создания и размещения разметки карточки
const places = document.querySelector('.places');
//const placeTemplate = document.querySelector('#place').content;

//переменные попапа добавления карточки
const placePopup = document.querySelector('.popup_place');
const placePopupCloseButton = document.querySelector('.popup__close_place');
const placePopupName = document.querySelector('.popup__name_place');
const placePopupLink = document.querySelector('.popup__link_place');
const placePopupForm = document.querySelector('.popup__container_place');

//переменные попапа для просмотра фото
const placeViewPopup = document.querySelector('.popup_place-view');
const placeViewPopupCloseButton = document.querySelector('.popup__close_place-view');

const keysForFormValidate = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_state_error',
  errorSelector: '.error'
};

const profileValidator = new FormValidator(keysForFormValidate, profilePopupForm);
const placeValidator = new FormValidator(keysForFormValidate, placePopupForm);

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
  if (!popupName.classList.contains('popup_opened')) {
    document.addEventListener('keydown',closePopupByEsc);
  } else {
    document.removeEventListener('keydown',closePopupByEsc);
  }
  popupName.classList.toggle('popup_opened');
}

function closePopupByClickOverlay(event) {
  if (event.target !== event.currentTarget) {
      return;
  }
  togglePopup(event.target);
}

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    togglePopup(document.querySelector('.popup_opened'));
  }
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

function insertPlaceCard(card) {
  places.prepend(card);
}

//размещение на странице карточек описанных в массиве объектов
initialCards.forEach(({ name, link }) => {
  const card = new Card(name, link, '#place');
  insertPlaceCard(card.createCard());
});

profileValidator.validateForm();
placeValidator.validateForm();

personEditButton.addEventListener('click', () => {
  copyPersonInfoToPopup();
  profileValidator.clearPopupFromErrors();
  togglePopup(profilePopup);
});

profilePopupCloseButton.addEventListener('click', () => {
  togglePopup(profilePopup);
});

profilePopupForm.addEventListener('submit', copyPersonInfoToPage);

profilePopup.addEventListener('click', closePopupByClickOverlay);

placeAddButton.addEventListener('click', () => {
  placePopupName.value = '';
  placePopupLink.value = '';
  placeValidator.clearPopupFromErrors();
  togglePopup(placePopup);
});

placePopupCloseButton.addEventListener('click', () => {togglePopup(placePopup)});

placePopupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  insertPlaceCard((new Card(placePopupName.value, placePopupLink.value, '#place')).createCard());
  togglePopup(placePopup);
});

placePopup.addEventListener('click', closePopupByClickOverlay);

placeViewPopupCloseButton.addEventListener('click', () => {
  togglePopup(placeViewPopup);
});

placeViewPopup.addEventListener('click', closePopupByClickOverlay);
