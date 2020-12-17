export function renderLoading(isLoading) {
  const submitButton = document.querySelector('.popup_opened')
    .querySelector('.popup__submit');
    if (isLoading) {
      submitButton.textContent = 'Сохранение...';
    } else {
      submitButton.textContent = 'Сохранить';
    }
}
