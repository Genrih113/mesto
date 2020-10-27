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

function toggleButtonState(inputElements, button) {
  if (hasInvalidInput(inputElements)) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

function validateForms() {
  const formElements = Array.from(document.querySelectorAll('.popup__container'));

  formElements.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    });

    const button = form.querySelector('.popup__submit');
    const inputElements = Array.from(form.querySelectorAll('.popup__input'));

    toggleButtonState(inputElements, button);

    inputElements.forEach((input) => {
      addEventListener('input', () => {
        isValid(form, input);
        toggleButtonState(inputElements, button);
      });
    });
  });
}

validateForms();
