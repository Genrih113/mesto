import './pages/index.css';
import {Card} from './components/card.js';
import {FormValidator} from './components/validate.js';
import {Section} from './components/section.js';
import {PopupWithForm} from './components/popupwithform.js';
import {PopupWithImage} from './components/popupwithimage.js';
import {UserInfo} from './components/userinfo.js';
import {PopupWithConfirm} from './components/popupwithconfirm.js';
import {Api} from './components/api.js';

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

  avatarPopupSelector,
  avatarButton,
  avatarPopupForm,
  personAvatar,
  confirmPopupSelector,

  serverKeys
} from './utils/constants.js';


//колбэк класса Section
function renderer({name, link, _id, likes, owner}, containerSelector) {
  let isItMyCard;
  let doILiked;
  if (owner._id === userId) {
    isItMyCard = true;
  } else {
    isItMyCard = false;
  };
  if(likes.some((like) => {
    return like._id === userId;
  })) {
    doILiked = true;
  } else {
    doILiked = false;
  };
  const cardElement = new Card(name, link, placeTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick, _id, likes.length, isItMyCard, doILiked);
  const cardsBlock = document.querySelector(containerSelector);
  cardsBlock.append(cardElement.createCard());
}

//колбэк класса PopupWithForm для попапа профиля
function submiterForProfile(inputsInfoObject) {
  api.editUserInfo(inputsInfoObject)
  .then((result) => {
    userInfo.setUserInfo({name: result.name, passion: result.about});
    this.close();
  })
  .catch(err => {
    console.log(err);
    this.close();
  });
}

//колбэк класса PopupWithForm для попапа добавления новой карточки
function submiterForPlace(inputsInfoObject) {
  api.addNewCard(inputsInfoObject)
    .then((result) => {
      let isItMyCard = true;
      let doILiked = false;
      let cardsSection = new Section({items: result, renderer}, placesContainerSelector);
      cardsSection.addItem((new Card(
        result.name, result.link, placeTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick, result._id, result.likes.length, isItMyCard, doILiked))
        .createCard());
      this.close();
    })
    .catch(err => {
      console.log(err);
      this.close();
    })
}

//колбэк отправки аватара
function submiterForAvatar(url) {
  api.changeAvatar(url)
  .then((result) => {
    personAvatar.src = result.avatar;
    this.close();
  })
  .catch(err => {
    console.log(err);
    this.close();
  })
}

//колбэк класса Card для открытия картинки в попапе
function handleCardClick() {
  placeViewPopupClass.open(this._placeName, this._placeLink);
}

//колбэк класса Card для лайков
function handleLikeClick() {
  if (!this._doILikedCard) {
    api.likeToggleCard(this._doILikedCard, this._imageId)
    .then((result) => {
      this._place.querySelector('.place__like-button').classList.add('place__like-button_liked');
      this._place.querySelector('.place__like-counter').textContent = result.likes.length;
    })
    .catch(err => {
      console.log(err);
    })
  } else {
    api.likeToggleCard(this._doILikedCard, this._imageId)
    .then((result) => {
      this._place.querySelector('.place__like-button').classList.remove('place__like-button_liked');
      this._place.querySelector('.place__like-counter').textContent = result.likes.length;
    })
    .catch(err => {
      console.log(err);
    })
  }
}

//колбэк класса Card для открытия попапа подтверждения удаления
function handleDeleteClick() {
  confirmPopupClass.setSubmiter(() => submiterForPopupWithConfirm(this._imageId, this._place));
  confirmPopupClass.open();
}

//колбэк класса PopupWithConfirm для удаления карточки
function submiterForPopupWithConfirm(imageId, placeCard) {
  api.deleteCard(imageId)
  .then((result) => {
    placeCard.remove();
  })
  .catch(err => {
    console.log(err);
  })
}


const userInfo = new UserInfo({nameSelector: personNameSelector, passionSelector: personPassionSelector});

const api = new Api(serverKeys);

let userId;

//запрос данных пользователя и карточек с сервера и рендер карточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(dataFromPromises => {
  const [userDataObj, initialCardsObj] = dataFromPromises;
  userId = userDataObj._id;
  personAvatar.src = userDataObj.avatar;
  userInfo.setUserInfo({name: userDataObj.name, passion: userDataObj.about});
  const serverCards = new Section({items: initialCardsObj, renderer}, placesContainerSelector);
  serverCards.renderItems();
})
.catch(err => {
  console.log(err);
})


const profilePopupClass = new PopupWithForm(profilePopupSelector, submiterForProfile);
profilePopupClass.setEventListeners();


const placePopupClass = new PopupWithForm(placePopupSelector, submiterForPlace);
placePopupClass.setEventListeners();


const avatarPopupClass = new PopupWithForm(avatarPopupSelector, submiterForAvatar);
avatarPopupClass.setEventListeners();


const placeViewPopupClass = new PopupWithImage(placeViewPopupSelector);
placeViewPopupClass.setEventListeners();


const confirmPopupClass = new PopupWithConfirm(confirmPopupSelector);//, submiterForPopupWithConfirm);
confirmPopupClass.setEventListeners();


const profileValidator = new FormValidator(keysForFormValidate, profilePopupForm);
const placeValidator = new FormValidator(keysForFormValidate, placePopupForm);
const avatarValidator = new FormValidator(keysForFormValidate, avatarPopupForm);
profileValidator.validateForm();
placeValidator.validateForm();
avatarValidator.validateForm();


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


avatarButton.addEventListener('click', () => {
  avatarValidator.clearPopupFromErrors();
  avatarPopupClass.open();
});
