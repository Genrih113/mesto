import { Popup } from "./popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, submiter) {
    super(popupSelector);
    this.submiter = submiter;
    this.inputs = Array.from(this.popup.querySelectorAll('.popup__input'));
    this.popupForm = this.popup.querySelector('.popup__container');
    this.inputsInfoObject = {};
  }

  _getInputValues() {
    this.inputs.forEach(input => {
      this.inputsInfoObject[input.name] = input.value;
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this.submiter();
    });
  }

  close() {
    super.close();
    this.popupForm.reset();
  }

}
