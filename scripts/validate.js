import {personEditButton, placeAddButton, placePopup, profilePopup} from './index.js';

export class FormValidator {
  constructor({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorSelector
    }, validatedPopupElement) {
      this._formSelector = formSelector;
      this._inputSelector = inputSelector;
      this._submitButtonSelector = submitButtonSelector;
      this._inactiveButtonClass = inactiveButtonClass;
      this._inputErrorClass = inputErrorClass;
      this._errorSelector = errorSelector;
      this._validatedFormElement = validatedPopupElement.querySelector(formSelector);
  }

  _showInputError(input) {
    input.classList.add(this._inputErrorClass);
    const errorElement = this._validatedFormElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    input.classList.remove(this._inputErrorClass);
    const errorElement = this._validatedFormElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput(inputElements) {
    return inputElements.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(inputElements) {
    const button = this._validatedFormElement.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput(inputElements)) {
      button.disabled = true;
      button.classList.add(this._inactiveButtonClass);
    } else {
      button.disabled = false;
      button.classList.remove(this._inactiveButtonClass);
    }
  }


  clearPopupFromErrors() {
    const spanElements = Array.from(this._validatedFormElement.querySelectorAll(this._errorSelector));
    spanElements.forEach((span) => {
      span.textContent = '';
    });
    const inputElements = Array.from(this._validatedFormElement.querySelectorAll(this._inputSelector));
    inputElements.forEach((input) => {
      input.classList.remove(this._inputErrorClass);
    });
    const submitButton = this._validatedFormElement.querySelector(this._submitButtonSelector);
    submitButton.disabled = true;
    submitButton.classList.add(this._inactiveButtonClass);
  }



  validateForm() {

    this._validatedFormElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    });

    const inputElements = Array.from(this._validatedFormElement.querySelectorAll(this._inputSelector));

    this._toggleButtonState(inputElements);

    inputElements.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState(inputElements);
      });
    });
  }
}

//validateForms({
const formsKeys = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_state_error',
  errorSelector: '.error'
};

const profileValidator = new FormValidator(formsKeys, profilePopup);
const placeValidator = new FormValidator(formsKeys, placePopup);

personEditButton.addEventListener('click', () => {
  profileValidator.clearPopupFromErrors();
});
profileValidator.validateForm();

placeAddButton.addEventListener('click', () => {
  placeValidator.clearPopupFromErrors();
});
placeValidator.validateForm();
