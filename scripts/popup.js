export class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    this.popup = document.querySelector(popupSelector);
    this.popupCloseIcon = this.popup.querySelector('.popup__close');
  }

  open() {
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this.popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this.popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    this.popup.addEventListener('click', (evt) => {
      if (evt.target !== evt.currentTarget) {
        return;
      }
      this.close(evt.target);
    });
    this.popupCloseIcon.addEventListener('click', () => {
      this.close();
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
