import { Popup } from "./popup.js";
export class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submiter = null;
    this._popupForm = this._popup.querySelector('.popup__container');
  }

setSubmiter(submiter) {
  this._submiter = submiter;
}

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submiter();
      this.close();
    });
  }
}
