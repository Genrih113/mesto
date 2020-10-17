//переменные отображаемые на странице
let personEditButton = document.querySelector('.person__edit-button');
let personName = document.querySelector('.person__name');
let personPassion = document.querySelector('.person__passion');

//переменные попапа редактирования профиля
let profilePopup = document.querySelector('.popup_profile');
let profilePopupCloseButton = document.querySelector('.popup__close_profile');
let profilePopupName = document.querySelector('.popup__name_profile');
let profilePopupPassion = document.querySelector('.popup__passion_profile');
let profilePopupForm = document.querySelector('.popup__container_profile');

function popupToggleFn(popupName) {
  popupName.classList.toggle('popup_opened');
};

function personInfoCopyToPopupFn() {
  profilePopupName.value = personName.textContent;
  profilePopupPassion.value = personPassion.textContent;
};

function personInfoCopyToPageFn(event) {
  event.preventDefault();
  personName.textContent = profilePopupName.value;
  personPassion.textContent = profilePopupPassion.value;
  popupToggleFn(profilePopup);
};

personEditButton.addEventListener('click', () => {
  if (profilePopup.classList.contains('popup_opened') === false) {
    personInfoCopyToPopupFn();
  }
  popupToggleFn(profilePopup)});

profilePopupCloseButton.addEventListener('click', () => {
  popupToggleFn(profilePopup);
});

profilePopupForm.addEventListener('submit', personInfoCopyToPageFn);

profilePopup.addEventListener('click', () => {
  if (event.target !== event.currentTarget) {
    return;
  }
  popupToggleFn(profilePopup);
});


//далее код относящийся к проектной 5
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

let placeName;
let placeLink;
//placeName = initialCards[0].name;
//placeLink = initialCards[0].link;

let placeViewPopup = document.querySelector('.popup_place-view');
const places = document.querySelector('.places');
const placeTemplate = document.querySelector('#place').content;

function placeInsertInListTop(placeName, placeLink) {
  const place = placeTemplate.cloneNode(true);
  place.querySelector('.place__title').textContent = placeName;
  place.querySelector('.place__img').alt = placeName;
  place.querySelector('.place__img').src = placeLink;

  let placeDeleteButton = place.querySelector('.place__delete-button');
  placeDeleteButton.addEventListener('click', function placeDeleteFn() {
    placeDeleteButton.parentElement.remove();
  });

  let placeLikeButton = place.querySelector('.place__like-button');
  placeLikeButton.addEventListener('click', function placeLikedFn() {
    placeLikeButton.classList.toggle('place__like-button_liked');
  });

  let placeImageButton = place.querySelector('.place__img');
  placeImageButton.addEventListener('click', function placeImageViewFn() {
    placeViewPopup.classList.toggle('popup_opened');
    placeViewPopup.querySelector('.popup__place-image').src = placeLink;
    placeViewPopup.querySelector('.popup__place-caption').textContent = placeName;
  });

  places.prepend(place);
}

//размещение на странице карточек описанных в массиве объектов
for (let i = 0; i < initialCards.length; i++) {
  placeName = initialCards[i].name;
  placeLink = initialCards[i].link;
  placeInsertInListTop(placeName, placeLink);
}


let addButton = document.querySelector('.add-button');
let placePopup = document.querySelector('.popup_place');
let placePopupCloseButton = document.querySelector('.popup__close_place');
let placePopupName = document.querySelector('.popup__name_place');
let placePopupLink = document.querySelector('.popup__link_place');
let placePopupForm = document.querySelector('.popup__container_place');

function newPlaceCardInsertFn(event) {
  event.preventDefault();
  placeInsertInListTop(placePopupName.value, placePopupLink.value);
  popupToggleFn(placePopup);
};

addButton.addEventListener('click', () => {
  popupToggleFn(placePopup);
  placePopupName.value = '';
  placePopupLink.value = '';
});
placePopupCloseButton.addEventListener('click', () => {popupToggleFn(placePopup)});
placePopupForm.addEventListener('submit', newPlaceCardInsertFn);
placePopup.addEventListener('click', () => {
  if (event.target !== event.currentTarget) {
    return;
  }
  popupToggleFn(placePopup);
});

let placeViewPopupCloseButton = document.querySelector('.popup__close_place-view');
placeViewPopupCloseButton.addEventListener('click', () => {
  popupToggleFn(placeViewPopup);
});

placeViewPopup.addEventListener('click', () => {
  if (event.target !== event.currentTarget) {
    return;
  }
  popupToggleFn(placeViewPopup);
});




//реализация "общей" кнопки закрытия попапов
/*
let closeBtn = document.querySelectorAll('.popup__close');
console.log(closeBtn);
console.log(closeBtn[0].parentElement.parentElement);
for (let i = 0; i < closeBtn.length; i++) {
  closeBtn[i].addEventListener('click', () => {
    popupToggleFn(closeBtn[i].parentElement.parentElement);
  });
};
*/
