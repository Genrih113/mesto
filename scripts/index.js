let personEditButton = document.querySelector('.person__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let popupSubmitButton = document.querySelector('.popup__submit');
let popupName = document.querySelector('.popup__name');
let popupPassion = document.querySelector('.popup__passion');
let personName = document.querySelector('.person__name');
let personPassion = document.querySelector('.person__passion');

function popupToggleFn() {
  event.preventDefault();
  popup.classList.toggle('popup_opened');
  personInfoCopyToPopupFn();
};

function personInfoCopyToPopupFn() {
  popupName.value = personName.textContent;
  popupPassion.value = personPassion.textContent;
};

function personInfoCopyToPageFn() {
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
popupSubmitButton.addEventListener('click', personInfoCopyToPageFn);
popup.addEventListener('click', popupBackgrClickCloseFn);
