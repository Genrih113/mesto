import './pages/index.css';
import {Card} from './components/card.js';
import {FormValidator} from './components/validate.js';
import {Section} from './components/section.js';
import {PopupWithForm} from './components/popupwithform.js';
import {PopupWithImage} from './components/popupwithimage.js';
import {UserInfo} from './components/userinfo.js';

import {
  personEditButton,
  placeAddButton,
  profilePopupName,
  profilePopupPassion,
  profilePopupForm,
  placePopupForm,
  placeTemplateSelector,
  placesContainerSelector,
  personNameSelector,
  personPassionSelector,
  profilePopupSelector,
  placePopupSelector,
  placeViewPopupSelector,
  keysForFormValidate,
  initialCards
} from './utils/constants.js';

const profileValidator = new FormValidator(keysForFormValidate, profilePopupForm);
const placeValidator = new FormValidator(keysForFormValidate, placePopupForm);

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
