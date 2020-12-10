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
  initialCards,

  avatarPopupSelector,
  avatarButton,
  personAvatar,
  personName,
  personPassion
} from './utils/constants.js';

//рендер карточек
fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
  headers: {
    authorization: '7d3b332b-dc1e-49e3-90aa-8e33833ea304'
  }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
    const serverCards = new Section({items: result, renderer}, placesContainerSelector);
    serverCards.renderItems();
  });

//получение инфо пользователя
fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me', {
  headers: {
    authorization: '7d3b332b-dc1e-49e3-90aa-8e33833ea304'
  }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
    personAvatar.src = result.avatar;
    personName.textContent = result.name;
    personPassion.textContent = result.about;
  });






const profileValidator = new FormValidator(keysForFormValidate, profilePopupForm);
const placeValidator = new FormValidator(keysForFormValidate, placePopupForm);

//колбэк класса Section
function renderer({name, link, likes}, containerSelector) {
  console.log(likes);
  const cardElement = new Card(name, link, placeTemplateSelector, handleCardClick, likes.length);
  const cardsBlock = document.querySelector(containerSelector);
  cardsBlock.prepend(cardElement.createCard());
}

//const cardsSection = new Section({items: initialCards, renderer}, placesContainerSelector);
//cardsSection.renderItems();

const userInfo = new UserInfo({nameSelector: personNameSelector, passionSelector: personPassionSelector});

//колбэк класса PopupWithForm для попапа профиля
function submiterForProfile(inputsInfoObject) {
  fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '7d3b332b-dc1e-49e3-90aa-8e33833ea304',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: inputsInfoObject.popupInputName,
    about: inputsInfoObject.popupInputPassion
  })
  })
  .then((res) => res.json())
  .then((result) => {
  userInfo.setUserInfo({name: result.name, passion: result.about});
  });
}

const profilePopupClass = new PopupWithForm(profilePopupSelector, submiterForProfile);
profilePopupClass.setEventListeners();

//колбэк класса PopupWithForm для попапа добавления новой карточки
function submiterForPlace(inputsInfoObject) {
  fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
    method: 'POST',
    headers: {
      authorization: '7d3b332b-dc1e-49e3-90aa-8e33833ea304',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: inputsInfoObject.popupInputPlace,
      link: inputsInfoObject.popupInputLink
    })
    })
    .then((res) => res.json())
    .then((result) => {
      cardsSection.addItem((new Card(
        result.name, result.link, placeTemplateSelector, handleCardClick))
        .createCard());
    });

}

const placePopupClass = new PopupWithForm(placePopupSelector, submiterForPlace);
placePopupClass.setEventListeners();


//Avatar IMG story
const avatarPopupClass = new PopupWithForm(avatarPopupSelector, submiterForAvatar);
avatarPopupClass.setEventListeners();
avatarButton.addEventListener('click', () => {
  avatarPopupClass.open();
});
function submiterForAvatar(url) {
  document.querySelector('.person__avatar').src = url.popupInputAvatarLink;
}



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
