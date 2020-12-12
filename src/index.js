import './pages/index.css';
import {Card} from './components/card.js';
import {FormValidator} from './components/validate.js';
import {Section} from './components/section.js';
import {PopupWithForm} from './components/popupwithform.js';
import {PopupWithImage} from './components/popupwithimage.js';
import {UserInfo} from './components/userinfo.js';
import {PopupWithConfirm} from './components/popupwithconfirm.js';

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
  personPassion,
  confirmPopupSelector
} from './utils/constants.js';
import { Popup } from './components/popup';

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
function renderer({name, link, _id, likes, owner}, containerSelector) {
  //console.log(likes);
  let isItMyCard = false; let doILiked = false;
  if (owner._id === "75afb32823f9c1dc44155bd8") {
    isItMyCard = true;
  } else {
    isItMyCard = false;
  };
  if(likes.some((like) => {
    return like._id === "75afb32823f9c1dc44155bd8";
  })) {doILiked = true};
  console.log(isItMyCard);
  const cardElement = new Card(name, link, placeTemplateSelector, handleCardClick, handleDeleteClick, _id, likes.length, isItMyCard, doILiked);
  const cardsBlock = document.querySelector(containerSelector);
  //cardsBlock.prepend(cardElement.createCard());
  cardsBlock.append(cardElement.createCard());
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
      console.log(result);
      let isItMyCard = true;
      let doILiked = false;
      let cardsSection = new Section({items: result, renderer}, placesContainerSelector);
      cardsSection.addItem((new Card(
        result.name, result.link, placeTemplateSelector, handleCardClick, handleDeleteClick, result._id, result.likes.length, isItMyCard, doILiked))
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
  fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me/avatar', {
  method: 'PATCH',
  headers: {
    authorization: '7d3b332b-dc1e-49e3-90aa-8e33833ea304',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    avatar: url.popupInputAvatarLink
  })
  })
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
    document.querySelector('.person__avatar').src = result.avatar;
  });
}



const placeViewPopupClass = new PopupWithImage(placeViewPopupSelector);
placeViewPopupClass.setEventListeners();

//колбэк класса Card для открытия картинки в попапе
function handleCardClick() {
  placeViewPopupClass.open(this._placeName, this._placeLink);
}

let cardId = '';
let deletableCard;
//колбэк открытия попапа подтверждения удаления
function handleDeleteClick() {
  confirmPopupClass.open();
  cardId = this.getImageId();
  //submiterForPopupWithConfirm(this.getImageId());
  //this._place.remove();
  deletableCard = this._place;
}




const confirmPopupClass = new PopupWithConfirm(confirmPopupSelector, submiterForPopupWithConfirm);
confirmPopupClass.setEventListeners();
//колбэк удаления карточки
function submiterForPopupWithConfirm() {
  //let cardId = this.getImageId();
  console.log(this);
  console.log('https://mesto.nomoreparties.co/v1/cohort-18/cards/' + cardId);
  fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards/' + cardId, {
    method: 'DELETE',
    headers: {
      authorization: '7d3b332b-dc1e-49e3-90aa-8e33833ea304',
      'Content-Type': 'application/json'
    }
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      deletableCard.remove();
    });
}

//колбэк лайка
// function handleLikeClick() {
//   fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards/likes' + this._imageId, {
//     method: 'PUT',
//     headers: {
//       authorization: '7d3b332b-dc1e-49e3-90aa-8e33833ea304',
//       'Content-Type': 'application/json'
//     }
//     })
//     .then((res) => res.json())
//     .then((result) => {
//       console.log(result);
//     });
// }







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
