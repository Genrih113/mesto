import { Popup } from "./popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, submiter) {
    super(popupSelector);
    this._submiter = submiter;
    this._inputs = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._popupForm = this._popup.querySelector('.popup__container');
    this._inputsInfoObject = {}; //{popupInputName:, popupInputPassion:} or {popupInputName:, popupInputLink:}
    this._submitButton = this._popup.querySelector('.popup__submit');
  }

  _getInputValues() {
    this._inputs.forEach(input => {
      this._inputsInfoObject[input.name] = input.value;
    });
    return this._inputsInfoObject;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = 'Сохранение...';
      this._submiter(this._getInputValues());
    //  this.close();
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
    this._submitButton.textContent = 'Сохранить';
  }

}
