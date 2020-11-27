export class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    this.popup = document.querySelector(popupSelector);
    this.popupCloseIcon = this.popup.querySelector('.popup__close');
    console.log(this.popupCloseIcon);
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
    this.popup.addEventListener('click', () => {
      if (event.target !== event.currentTarget) {
        return;
      }
      this.close(event.target);
    });
    this.popupCloseIcon.addEventListener('click', () => {
      this.close();
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      //this._close(document.querySelector('.popup_opened'));
      this.close();
    }
  }
}
