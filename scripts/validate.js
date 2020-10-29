function showInputError(form, input) {
  input.classList.add('popup__input_state_error');
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
}

function hideInputError(form, input) {
  input.classList.remove('popup__input_state_error');
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = '';
}

function isValid(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input);
  } else {
    hideInputError(form, input);
  }
}

function hasInvalidInput(inputElements) {
  return inputElements.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(form, inputElements) {
  const button = form.querySelector('.popup__submit');

  if (hasInvalidInput(inputElements)) {
    button.disabled = true;
    button.classList.add('popup__submit_disabled');
  } else {
    button.disabled = false;
    button.classList.remove('popup__submit_disabled');
  }
}

function validateForms() {
  const formElements = Array.from(document.querySelectorAll('.popup__container'));

  formElements.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    });

    const inputElements = Array.from(form.querySelectorAll('.popup__input'));

    toggleButtonState(form, inputElements);

    inputElements.forEach((input) => {
      input.addEventListener('input', () => {
        isValid(form, input);
        toggleButtonState(form, inputElements);
      });
    });
  });
}

/*validateForms({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_state_error',
  errorClass: 'error'
});*/


validateForms();

function clearPopupFromErrors(markupElement) {
  const spanElements = Array.from(markupElement.querySelectorAll('.error'));
  spanElements.forEach((span) => {
    span.textContent = '';
  });
  const inputElements = Array.from(markupElement.querySelectorAll('.popup__input'));
  inputElements.forEach((input) => {
    input.classList.remove('popup__input_state_error');
  });
  const submitButton = markupElement.querySelector('.popup__submit');
  submitButton.disabled = true;
  submitButton.classList.add('popup__submit_disabled');
}


function f1 () {
  console.log(first);
}

function f2 (first) {
  console.log();
  f1(first);
}

function f3 ({
  first,
  second,
  third}) {
  console.log(third);
  f2(first);
}
/*
f3({
  first: 'первый',
  second: 'второй',
  third: 'третий'
});
*/

f3 ({
  first: 'первый',
  second: 'второй',
  third: 'третий'
});
