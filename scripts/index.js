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


/*
function createPlaceCard(placeName, placeLink) {
  const place = placeTemplate.cloneNode(true);
  const placeImageButton = place.querySelector('.place__img');
  place.querySelector('.place__title').textContent = placeName;
  placeImageButton.alt = placeName;
  placeImageButton.src = placeLink;

  const placeDeleteButton = place.querySelector('.place__delete-button');
  placeDeleteButton.addEventListener('click', function deletePlaceCard() {
    placeDeleteButton.parentElement.remove();
  });

  const placeLikeButton = place.querySelector('.place__like-button');
  placeLikeButton.addEventListener('click', function likePlaceCard() {
    placeLikeButton.classList.toggle('place__like-button_liked');
  });

  placeImageButton.addEventListener('click', function viewPlaceCard() {
    placeViewPopup.querySelector('.popup__place-image').src = placeLink;
    placeViewPopup.querySelector('.popup__place-caption').textContent = placeName;
    togglePopup(placeViewPopup);
  });

  return place;
}
*/

class Card {
  constructor(placeName, placeLink, selector) {
    this.placeName = placeName;
    this.placeLink = placeLink;
    this.selector = selector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this.selector)
      .content
      .cloneNode(true);
    return cardElement;
  }

  _setCardDeleteFunc() {
    this.placeDeleteButton.addEventListener('click', () => {
      this.placeDeleteButton.parentElement.remove();
    });
  }

  _setCardLikeFunc() {
    this.placeLikeButton.addEventListener('click', () => {
      this.placeLikeButton.classList.toggle('place__like-button_liked');
    });
  }

  _setCardImgViewFunc() {
    this.placeImageButton.addEventListener('click', () => {
      placeViewPopup.querySelector('.popup__place-image').src = this.placeLink;
      placeViewPopup.querySelector('.popup__place-caption').textContent = this.placeName;
      togglePopup(placeViewPopup);
    });
  }

  createCard() {

    this.place = this._getTemplate();
    console.log(this.place);
    this.placeDeleteButton = this.place.querySelector('.place__delete-button');
    this.placeLikeButton = this.place.querySelector('.place__like-button');
    this.placeImageButton = this.place.querySelector('.place__img');
    this.place.querySelector('.place__title').textContent = this.placeName;
    this.placeImageButton.alt = this.placeName;
    this.placeImageButton.src = this.placeLink;

    this._setCardDeleteFunc();
    this._setCardLikeFunc();
    this._setCardImgViewFunc();
    return this.place;

    /*
    const placeDeleteButton = this.place.querySelector('.place__delete-button');
    placeDeleteButton.addEventListener('click', function deletePlaceCard() {
      placeDeleteButton.parentElement.remove();
    });
    */

    /*const placeLikeButton = this.place.querySelector('.place__like-button');
    placeLikeButton.addEventListener('click', function likePlaceCard() {
      placeLikeButton.classList.toggle('place__like-button_liked');
    });*/

    /*placeImageButton.addEventListener('click', function viewPlaceCard() {
      placeViewPopup.querySelector('.popup__place-image').src = this.placeLink;
      placeViewPopup.querySelector('.popup__place-caption').textContent = this.placeName;
      togglePopup(placeViewPopup);
    });*/
  }
}

function insertPlaceCard(card) {
  places.prepend(card);
}

//размещение на странице карточек описанных в массиве объектов
/*
initialCards.forEach(({ name, link }) => {
  const card = createPlaceCard(name, link);
  insertPlaceCard(card);
});
*/

initialCards.forEach(({ name, link }) => {
  const card = new Card(name, link, '#place');
  insertPlaceCard(card.createCard());
});

personEditButton.addEventListener('click', () => {
  copyPersonInfoToPopup();
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





// class Parent {
//   constructor(a, b, c) {
//     this.a = a;
//     this.b = b;
//     this.c = c;
//    // this.d = '5th';
//   }

//   consoleFn() {
//     console.log(this.d);
//   }

//   consoleFn2() {
//     this.d = '4th arg';
//     console.log(this.a + this.b + this.c + this.d);
//     this.consoleFn();
//   }

//   consoleFn3() {
//     console.log(this.a + this.b + this.c+ this.d);
//     this.consoleFn();
//   }
// }

// const parent = new Parent('1', '2', '3');
// parent.consoleFn();
// parent.consoleFn2();
// //parent.consoleFn3();
