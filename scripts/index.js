//вставка попапа из темплейта
/*
let footer = document.querySelector('.footer');
let popupTemplate = document.querySelector('#popup').content;
function popupInsertIntoHTML() {
  const popup = popupTemplate.cloneNode(true);
  footer.after(popup);
}
popupInsertIntoHTML();
*/

let personEditButton = document.querySelector('.person__edit-button');
let personName = document.querySelector('.person__name');
let personPassion = document.querySelector('.person__passion');

let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let popupName = document.querySelector('.popup__name');
let popupPassion = document.querySelector('.popup__passion');
let popupForm = document.querySelector('.popup__container');

function popupToggleFn() {
  if (popup.classList.contains('popup_opened') === false) {
    personInfoCopyToPopupFn();
  }
  popup.classList.toggle('popup_opened');
};

function personInfoCopyToPopupFn() {
  popupName.value = personName.textContent;
  popupPassion.value = personPassion.textContent;
};

function personInfoCopyToPageFn(event) {
  event.preventDefault();
  personName.textContent = popupName.value;
  personPassion.textContent = popupPassion.value;
  popupToggleFn();
};

function popupBackgrClickCloseFn(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  popupToggleFn();
};

personEditButton.addEventListener('click', popupToggleFn);
popupCloseButton.addEventListener('click', popupToggleFn);
popupForm.addEventListener('submit', personInfoCopyToPageFn);
popup.addEventListener('click', popupBackgrClickCloseFn);



//next code to 5th sprint
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
placeName = initialCards[0].name;
placeLink = initialCards[0].link;

const places = document.querySelector('.places');
const placeTemplate = document.querySelector('#place').content;

function placeInsertInListTop(placeName, placeLink) {
  const place = placeTemplate.cloneNode(true);
  place.querySelector('.place__title').textContent=placeName;
  place.querySelector('.place__img').src=placeLink;
  places.prepend(place);
}

for (let i = 0; i < initialCards.length; i++) {
  placeName = initialCards[i].name;
  placeLink = initialCards[i].link;
  placeInsertInListTop(placeName, placeLink);
}


let addButton = document.querySelector('.add-button');
let popupAdd = document.querySelector('.popup-add');

function popupAddToggleFn() {
  //if (popupAdd.classList.contains('popup_opened') === false) {
  //  personInfoCopyToPopupFn();
  //}
  popupAdd.classList.toggle('popup_opened');
};
/*
function personInfoCopyToPopupFn() {
  popupName.value = personName.textContent;
  popupPassion.value = personPassion.textContent;
};

function personInfoCopyToPageFn(event) {
  event.preventDefault();
  personName.textContent = popupName.value;
  personPassion.textContent = popupPassion.value;
  popupToggleFn();
};

function popupBackgrClickCloseFn(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  popupToggleFn();
};
*/
addButton.addEventListener('click', popupAddToggleFn);
//popupCloseButton.addEventListener('click', popupToggleFn);
//popupForm.addEventListener('submit', personInfoCopyToPageFn);
//popup.addEventListener('click', popupBackgrClickCloseFn);
