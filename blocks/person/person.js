let personEditButton = document.querySelector('.person__edit-button');
let popup = document.querySelector('.popup');

function popupToggleFn() {
  event.preventDefault();
  popup.classList.toggle('popup_opened');
}

personEditButton.addEventListener('click', popupToggleFn);
