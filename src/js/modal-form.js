const modalCloseButton = document.querySelector('.modal__close-form');
const backdrop = document.querySelector('.backdrop-form');
const submitButton = document.querySelector('.modal__form-submit');

export const openModalForm = function () {
  submitButton.innerHTML = '';
  document.body.classList.add('show-modal-form');
  window.addEventListener('keydown', onEscKeyPress);
  modalCloseButton.addEventListener('click', onCloseModal);
  backdrop.addEventListener('click', onBackdropClick);
  submitButton.insertAdjacentHTML('beforeend', 'Create Note');
};

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}
function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

export const onCloseModal = function () {
  document.body.classList.remove('show-modal-form');
  window.removeEventListener('keydown', onEscKeyPress);
  modalCloseButton.removeEventListener('click', onCloseModal);
  backdrop.removeEventListener('click', onBackdropClick);
};
