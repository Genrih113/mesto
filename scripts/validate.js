import {personEditButton, placeAddButton, placePopup, profilePopup} from './index.js';

function showInputError(form, input, inputErrorClass) {
  input.classList.add(inputErrorClass);
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
}

function hideInputError(form, input, inputErrorClass) {
  input.classList.remove(inputErrorClass);
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = '';
}

function isValid(form, input, inputErrorClass) {
  if (!input.validity.valid) {
    showInputError(form, input, inputErrorClass);
  } else {
    hideInputError(form, input, inputErrorClass);
  }
}

function hasInvalidInput(inputElements) {
  return inputElements.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(form, inputElements, submitButtonSelector, inactiveButtonClass) {
  const button = form.querySelector(submitButtonSelector);

  if (hasInvalidInput(inputElements)) {
    button.disabled = true;
    button.classList.add(inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(inactiveButtonClass);
  }
}


function clearPopupFromErrors(markupElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorSelector) {
  const spanElements = Array.from(markupElement.querySelectorAll(errorSelector));
  spanElements.forEach((span) => {
    span.textContent = '';
  });
  const inputElements = Array.from(markupElement.querySelectorAll(inputSelector));
  inputElements.forEach((input) => {
    input.classList.remove(inputErrorClass);
  });
  const submitButton = markupElement.querySelector(submitButtonSelector);
  submitButton.disabled = true;
  submitButton.classList.add(inactiveButtonClass);
}

function validateForms({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorSelector
  }) {

  personEditButton.addEventListener('click', () => {
    clearPopupFromErrors(profilePopup, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorSelector);
  });

  placeAddButton.addEventListener('click', () => {
    clearPopupFromErrors(placePopup, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorSelector);
  });

  const formElements = Array.from(document.querySelectorAll(formSelector));

  formElements.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    });

    const inputElements = Array.from(form.querySelectorAll(inputSelector));

    toggleButtonState(form, inputElements, submitButtonSelector, inactiveButtonClass);

    inputElements.forEach((input) => {
      input.addEventListener('input', () => {
        isValid(form, input, inputErrorClass);
        toggleButtonState(form, inputElements, submitButtonSelector, inactiveButtonClass);
      });
    });
  });
}

validateForms({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_state_error',
  errorSelector: '.error'
});
