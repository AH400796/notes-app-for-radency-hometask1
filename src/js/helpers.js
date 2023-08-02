import {
  deleteNote,
  archiveNote,
  unArchiveNote,
  openNote,
  openCategory,
  createNote,
  editNote,
  submitCreatingNote,
  submitEditingNote,
} from './note-actions';

export const newNoteForm = document.querySelector('.form');

export const textCutter = function (text, maxSymbolsNumber) {
  if (text.length - 3 > maxSymbolsNumber) {
    return text.slice(0, maxSymbolsNumber) + '...';
  } else {
    return text;
  }
};

export const setFormValue = function (note) {
  Array.from(document.querySelectorAll('.form__radio-input')).filter(input => input.value === note.category)[0].checked = true;
  document.querySelector('.form__input-name').value = note.name;
  document.querySelector('.form__input-date').value = convertDateFormat(note.dates);
  document.querySelector('.form__textarea').value = note.content;
};

export const getFormValue = function (filteredNotes) {
  const categoryValue = Array.from(document.querySelectorAll('.form__radio-input')).filter(input => input.checked)[0].value;
  const nameValue = document.querySelector('.form__input-name').value;
  const dateValue = document.querySelector('.form__input-date').value;
  const contentValue = document.querySelector('.form__textarea').value;
  const submitButton = document.querySelector('.modal__form-submit');
  const idValue =
    submitButton.dataset.noteid !== ''
      ? Number(submitButton.dataset.noteid)
      : Number(
          filteredNotes
            .map(note => note.id)
            .reduce((acc, item) => {
              if (acc > item) {
                return acc;
              } else {
                return item;
              }
            }, 0)
        ) + 1;
  const createdValue = formatDate(new Date());
  const newNote = {
    id: idValue,
    name: nameValue,
    created: createdValue,
    category: categoryValue,
    content: contentValue,
    dates: dateValue,
    archived: false,
  };
  return newNote;
};

function formatDate(date) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
}

function convertDateFormat(date) {
  if (date === '') {
    return null;
  }
  const parts = date.split('/');
  const day = parts[0].padStart(2, '0');
  const month = parts[1].padStart(2, '0');
  const year = parts[2];
  return `${year}-${month}-${day}`;
}

export const setElementsListeners = function () {
  const deleteNoteButtons = document.querySelectorAll('.button__delete-note');
  deleteNoteButtons.forEach(button => button.addEventListener('click', deleteNote));

  const archiveNoteButtons = document.querySelectorAll('.button__archive-note');
  archiveNoteButtons.forEach(button => button.addEventListener('click', archiveNote));

  const unArchiveNoteButtons = document.querySelectorAll('.button__unarchive-note');
  unArchiveNoteButtons.forEach(button => button.addEventListener('click', unArchiveNote));

  const notesList = document.querySelectorAll('.notes-active__list-item');
  notesList.forEach(note => note.addEventListener('click', openNote));

  const categoryList = document.querySelectorAll('.notes-category__list-item');
  categoryList.forEach(category => category.addEventListener('click', openCategory));

  const createNoteButton = document.querySelector('.button__create-note');
  createNoteButton.addEventListener('click', createNote);

  const editNoteButtons = document.querySelectorAll('.button__edit-note');
  editNoteButtons.forEach(button => button.addEventListener('click', editNote));

  const submitCreatingNewNoteButton = document.querySelector('.modal__form-submit.js-create');
  submitCreatingNewNoteButton?.addEventListener('click', submitCreatingNote);

  const submitEditingNoteButton = document.querySelector('.modal__form-submit.js-edit');
  submitEditingNoteButton?.addEventListener('click', submitEditingNote);
};
