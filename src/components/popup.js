import {popupCloseKey} from '../utils/constants.js';
export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._popupCloseIcon = this._popup.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target !== evt.currentTarget) {
        return;
      }
      this.close(evt.target);
    });
    this._popupCloseIcon.addEventListener('click', () => {
      this.close();
    });
  }

  _handleEscClose(evt) {
    if (evt.key === popupCloseKey) {
      this.close();
    }
  }
}
