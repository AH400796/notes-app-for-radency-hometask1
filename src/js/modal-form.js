const modalCloseButton = document.querySelector('.modal__close-form');
const backdrop = document.querySelector('.backdrop-form');
const submitButton = document.querySelector('.modal__form-submit');

export const openModalForm = function (action, id) {
  submitButton.innerHTML = '';
  document.body.classList.add('show-modal-form');
  window.addEventListener('keydown', onEscKeyPress);
  modalCloseButton.addEventListener('click', onCloseModal);
  backdrop.addEventListener('click', onBackdropClick);
  submitButton.insertAdjacentHTML('beforeend', action);
  if (action === 'Edit Note') {
    submitButton.setAttribute('data-noteId', id);
    submitButton.classList.add('js-edit');
    submitButton.classList.remove('js-create');
  } else {
    submitButton.setAttribute('data-noteId', '');
    submitButton.classList.add('js-create');
    submitButton.classList.remove('js-edit');
  }
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
