const modalCloseButton = document.querySelector('.modal__close');
const backdrop = document.querySelector('.backdrop');

export const openModal = function () {
  document.body.classList.add('show-modal');
  window.addEventListener('keydown', onEscKeyPress);
  modalCloseButton.addEventListener('click', onCloseModal);
  backdrop.addEventListener('click', onBackdropClick);
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

function onCloseModal() {
  document.body.classList.remove('show-modal');
  window.removeEventListener('keydown', onEscKeyPress);
  modalCloseButton.removeEventListener('click', onCloseModal);
  backdrop.removeEventListener('click', onBackdropClick);
}
