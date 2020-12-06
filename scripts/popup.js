export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._popupCloseIcon = this._popup.querySelector('.popup__close');
  }

  open() {
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
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
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
