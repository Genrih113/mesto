export class FormValidator {
  constructor({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorSelector
    }, validatedFormElement) {
      this._formSelector = formSelector;
      this._inputSelector = inputSelector;
      this._submitButtonSelector = submitButtonSelector;
      this._inactiveButtonClass = inactiveButtonClass;
      this._inputErrorClass = inputErrorClass;
      this._errorSelector = errorSelector;
      this._validatedFormElement = validatedFormElement;
      this._submitButton = validatedFormElement.querySelector(submitButtonSelector);
      this._inputElements = Array.from(validatedFormElement.querySelectorAll(inputSelector));
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

  _hasInvalidInput() {
    return this._inputElements.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  clearPopupFromErrors() {
    this._inputElements.forEach((input) => {
      this._hideInputError(input)});
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  validateForm() {
    this._validatedFormElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    });

    this._toggleButtonState();

    this._inputElements.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  }
}
