import {Card} from './components/card.js';
import {FormValidator} from './components/validate.js';
import {Section} from './components/section.js';
import {PopupWithForm} from './components/popupwithform.js';
import {PopupWithImage} from './components/popupwithimage.js';
import {UserInfo} from './components/userinfo.js';

//переменные кнопок, отображаемых на странице
const personEditButton = document.querySelector('.person__edit-button');
const placeAddButton = document.querySelector('.add-button');

//переменные попапа редактирования профиля
const profilePopupName = document.querySelector('.popup__name_profile');
const profilePopupPassion = document.querySelector('.popup__passion_profile');
const profilePopupForm = document.querySelector('.popup__container_profile');

//переменные попапа добавления карточки
const placePopupForm = document.querySelector('.popup__container_place');

//переменные с селекторами элементов страницы
const placeTemplateSelector = '#place';
const placesContainerSelector = '.places';
const personNameSelector = '.person__name';
const personPassionSelector = '.person__passion';
const profilePopupSelector = '.popup_profile';
const placePopupSelector = '.popup_place';
const placeViewPopupSelector = '.popup_place-view';

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

//колбэк класса Section
function renderer({name, link}, containerSelector) {
  const cardElement = new Card(name, link, placeTemplateSelector, handleCardClick);
  const cardsBlock = document.querySelector(containerSelector);
  cardsBlock.prepend(cardElement.createCard());
}

const cardsSection = new Section({items: initialCards, renderer}, placesContainerSelector);
cardsSection.renderItems();

const userInfo = new UserInfo({nameSelector: personNameSelector, passionSelector: personPassionSelector});

//колбэк класса PopupWithForm для попапа профиля
function submiterForProfile(inputsInfoObject) {
  userInfo.setUserInfo({name: inputsInfoObject.popupInputName, passion: inputsInfoObject.popupInputPassion});
}

const profilePopupClass = new PopupWithForm(profilePopupSelector, submiterForProfile);
profilePopupClass.setEventListeners();

//колбэк класса PopupWithForm для попапа добавления новой карточки
function submiterForPlace(inputsInfoObject) {
  cardsSection.addItem((new Card(
    inputsInfoObject.popupInputPlace, inputsInfoObject.popupInputLink, placeTemplateSelector, handleCardClick))
    .createCard());
}

const placePopupClass = new PopupWithForm(placePopupSelector, submiterForPlace);
placePopupClass.setEventListeners();

const placeViewPopupClass = new PopupWithImage(placeViewPopupSelector);
placeViewPopupClass.setEventListeners();

//колбэк класса Card для открытия картинки в попапе
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
