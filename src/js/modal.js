const backdrop = document.querySelector('.backdrop');
const backdropForm = document.querySelector('.backdrop-form');
const modalCloseButtons = document.querySelectorAll('.modal__close');
const submitEditButton = document.querySelector('.modal__form-submit.js-edit');
const submitCreateButton = document.querySelector('.modal__form-submit.js-create');

export const onCloseModal = function () {
  document.body.classList.remove('show-modal');
  document.body.classList.remove('show-modal-form');
  window.removeEventListener('keydown', onEscKeyPress);
  modalCloseButtons.forEach(button => button.removeEventListener('click', onCloseModal));
  backdrop.removeEventListener('click', onBackdropClick);
  backdropForm.removeEventListener('click', onBackdropClick);
};

export const openModal = function () {
  document.body.classList.add('show-modal');
  window.addEventListener('keydown', onEscKeyPress);
  modalCloseButtons.forEach(button => button.addEventListener('click', onCloseModal));
  backdrop.addEventListener('click', onBackdropClick);
};

export const openModalForm = function (action, id) {
  document.body.classList.add('show-modal-form');
  window.addEventListener('keydown', onEscKeyPress);
  modalCloseButtons.forEach(button => button.addEventListener('click', onCloseModal));
  backdropForm.addEventListener('click', onBackdropClick);
  if (action === 'Edit Note') {
    submitEditButton.setAttribute('data-noteId', id);
    submitCreateButton.classList.add('visually-hidden');
    submitEditButton.classList.remove('visually-hidden');
  } else {
    submitEditButton.setAttribute('data-noteId', '');
    submitEditButton.classList.add('visually-hidden');
    submitCreateButton.classList.remove('visually-hidden');
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
