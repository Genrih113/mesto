//переменные горячих клавиш
export const popupCloseKey = 'Escape';

//переменные кнопок, отображаемых на странице
export const personEditButton = document.querySelector('.person__edit-button');
export const placeAddButton = document.querySelector('.add-button');
export const avatarButton = document.querySelector('.person__avatar-button');

//переменные попапа редактирования профиля
export const profilePopupName = document.querySelector('.popup__name_profile');
export const profilePopupPassion = document.querySelector('.popup__passion_profile');
export const profilePopupForm = document.querySelector('.popup__container_profile');

//переменные попапа редактирования аватара
export const avatarPopupForm = document.querySelector('.popup__container_avatar');

//переменные попапа добавления карточки
export const placePopupForm = document.querySelector('.popup__container_place');

//переменные с селекторами элементов страницы
export const placeTemplateSelector = '#place';
export const placesContainerSelector = '.places';
export const personNameSelector = '.person__name';
export const personPassionSelector = '.person__passion';
export const profilePopupSelector = '.popup_profile';
export const placePopupSelector = '.popup_place';
export const placeViewPopupSelector = '.popup_place-view';
export const avatarPopupSelector = '.popup_avatar';
export const confirmPopupSelector = '.popup_confirm';

export const keysForFormValidate = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_state_error',
  errorSelector: '.error'
};

export const initialCards = [
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

export const personAvatar = document.querySelector('.person__avatar');
export const personName = document.querySelector('.person__name');
export const personPassion = document.querySelector('.person__passion');

//export const myOwnerId = '75afb32823f9c1dc44155bd8';

export const serverKeys = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
  token: '7d3b332b-dc1e-49e3-90aa-8e33833ea304'
}
