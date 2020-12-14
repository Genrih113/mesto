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
  initialCards,

  avatarPopupSelector,
  avatarButton,
  avatarPopupForm,
  personAvatar,
  personName,
  personPassion,
  confirmPopupSelector,

  serverKeys
} from './utils/constants.js';
import { Popup } from './components/popup';

const userInfo = new UserInfo({nameSelector: personNameSelector, passionSelector: personPassionSelector});


const apiEx = new Api(serverKeys);
//let userId;


// //получение инфо пользователя
// apiEx.getUserInfo()
// .then((result) => {
//   console.log(result);
//   userId = result._id;
//   personAvatar.src = result.avatar;
//   userInfo.setUserInfo({name: result.name, passion: result.about});
// })
// .catch(err => {
//   console.log(err);
// })


// //рендер карточек
// apiEx.getInitialCards()
// .then((result) => {
//   console.log(result);
//   const serverCards = new Section({items: result, renderer}, placesContainerSelector);
//   serverCards.renderItems();
// })
// .catch(err => {
//   console.log(err);
// })

//запрос данных пользователя и карточек с сервера и рендер карточек
Promise.all([apiEx.getUserInfo(), apiEx.getInitialCards()])
.then(dataFromPromises => {
  const [userDataObj, initialCardsObj] = dataFromPromises;
  const userId = userDataObj._id;
  personAvatar.src = userDataObj.avatar;
  userInfo.setUserInfo({name: userDataObj.name, passion: userDataObj.about});
  const serverCards = new Section({items: initialCardsObj, renderer}, placesContainerSelector);
  serverCards.renderItems();
})
// .catch(dataFromPromises => {
//   //const [userDataObj, initialCardsObj] = dataFromPromises;
//   console.log(dataFromPromises);
// })
.catch(err => {
  console.log(err);
})

//колбэк класса Section
function renderer({name, link, _id, likes, owner}, containerSelector) {
  let isItMyCard;
  let doILiked;
  if (owner._id === "75afb32823f9c1dc44155bd8") {
    isItMyCard = true;
  } else {
    isItMyCard = false;
  };
  if(likes.some((like) => {
    return like._id === "75afb32823f9c1dc44155bd8";
  })) {
    doILiked = true;
  } else {
    doILiked = false;
  };
  console.log(isItMyCard);
  const cardElement = new Card(name, link, placeTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick, _id, likes.length, isItMyCard, doILiked);
  const cardsBlock = document.querySelector(containerSelector);
  cardsBlock.append(cardElement.createCard());
}


//колбэк класса PopupWithForm для попапа профиля
function submiterForProfile(inputsInfoObject) {
  apiEx.editUserInfo(inputsInfoObject)
  .then((result) => {
    userInfo.setUserInfo({name: result.name, passion: result.about});
    this.close();
  })
  .catch(err => {
    console.log(err);
    this.close();
  });
}


const profilePopupClass = new PopupWithForm(profilePopupSelector, submiterForProfile);
profilePopupClass.setEventListeners();

//колбэк класса PopupWithForm для попапа добавления новой карточки
function submiterForPlace(inputsInfoObject) {
  apiEx.addNewCard(inputsInfoObject)
    .then((result) => {
      console.log(result);
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


const placePopupClass = new PopupWithForm(placePopupSelector, submiterForPlace);
placePopupClass.setEventListeners();


//Avatar IMG story
const avatarPopupClass = new PopupWithForm(avatarPopupSelector, submiterForAvatar);
avatarPopupClass.setEventListeners();

avatarButton.addEventListener('click', () => {
  avatarValidator.clearPopupFromErrors();
  avatarPopupClass.open();
});

//колбэк отправки аватара
function submiterForAvatar(url) {
  apiEx.changeAvatar(url)
  .then((result) => {
    console.log(result);
    personAvatar.src = result.avatar;
    this.close();
  })
  .catch(err => {
    console.log(err);
    this.close();
  })
}


const placeViewPopupClass = new PopupWithImage(placeViewPopupSelector);
placeViewPopupClass.setEventListeners();

//колбэк класса Card для открытия картинки в попапе
function handleCardClick() {
  placeViewPopupClass.open(this._placeName, this._placeLink);
}



let cardId; //присвоение в обработчике удаления класса Card
let deletableCard; //присвоение в обработчике удаления класса Card



//колбэк класса Card для открытия попапа подтверждения удаления
function handleDeleteClick() {
  confirmPopupClass.setSubmiter(() => submiterForPopupWithConfirm(this._imageId, this._place));
  confirmPopupClass.open();
 // cardId = this.getImageId();
 // deletableCard = this._place;
}

const confirmPopupClass = new PopupWithConfirm(confirmPopupSelector);//, submiterForPopupWithConfirm);
confirmPopupClass.setEventListeners();

//колбэк класса PopupWithConfirm для удаления карточки
function submiterForPopupWithConfirm(imageId, placeCard) {
  apiEx.deleteCard(imageId)
  .then((result) => {
    console.log(result);
    placeCard.remove();
  })
  .catch(err => {
    console.log(err);
  })
}




//колбэк класса Card для лайков
function handleLikeClick() {
  if (!this._doILikedCard) {
    apiEx.likeToggleCard(this._doILikedCard, this._imageId)
    .then((result) => {
      console.log(result);
      this._place.querySelector('.place__like-button').classList.add('place__like-button_liked');
      this._place.querySelector('.place__like-counter').textContent = result.likes.length;
    })
    .catch(err => {
      console.log(err);
    })
  } else {
    apiEx.likeToggleCard(this._doILikedCard, this._imageId)
    .then((result) => {
      this._place.querySelector('.place__like-button').classList.remove('place__like-button_liked');
      this._place.querySelector('.place__like-counter').textContent = result.likes.length;
    })
    .catch(err => {
      console.log(err);
    })
  }
}


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
