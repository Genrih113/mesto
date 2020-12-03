import {Card} from './card.js';
import {FormValidator} from './validate.js';
import {Section} from './section.js';
import { PopupWithForm } from './popupwithform.js';
import { PopupWithImage } from './popupwithimage.js';
import {UserInfo} from './userinfo.js';

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








function renderer({name, link}, containerSelector) {
  const cardElement = new Card(name, link, '#place', handleCardClick);
  const cardsBlock = document.querySelector(containerSelector);
  cardsBlock.prepend(cardElement.createCard());
}

const cardsSection = new Section({items: initialCards, renderer}, '.places');
cardsSection.renderItems();

const userInfo = new UserInfo({nameSelector: '.person__name', passionSelector: '.person__passion'});

function submiterForProfile(inputsInfoObject) {
  userInfo.setUserInfo({name: inputsInfoObject.popupInputName, passion: inputsInfoObject.popupInputPassion});
}

const profilePopupClass = new PopupWithForm('.popup_profile', submiterForProfile);
profilePopupClass.setEventListeners();

function submiterForPlace(inputsInfoObject) {
  cardsSection.addItem((new Card(
    inputsInfoObject.popupInputPlace, inputsInfoObject.popupInputLink, '#place', handleCardClick))
    .createCard());
}

const placePopupClass = new PopupWithForm('.popup_place', submiterForPlace);
placePopupClass.setEventListeners();

const placeViewPopupClass = new PopupWithImage('.popup_place-view');
placeViewPopupClass.setEventListeners();

function handleCardClick() {
  placeViewPopupClass.open(this._placeName, this._placeLink);
}

profileValidator.validateForm();
placeValidator.validateForm();

personEditButton.addEventListener('click', () => {
  profileValidator.clearPopupFromErrors();
  const userData = userInfo.getUserInfo();
  profilePopupName.value = userData.name;
  profilePopupPassion.value = userData.passion;
  profilePopupClass.open();
});

placeAddButton.addEventListener('click', () => {
  placeValidator.clearPopupFromErrors();
  placePopupClass.open();
});
