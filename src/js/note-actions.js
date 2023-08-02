import initialsNotes from './notes';
import { openModal, openModalForm, onCloseModal } from './modal';
import { createActiveNotesListMarkup, createNotesCategoryListMarkup, openNoteDetailsMarkup, openCategoryDetailsFormMarkup } from './markups';
import { getFormValue, setFormValue, nameInput, contentInput, categoryInput, setElementsListeners, newNoteForm } from './helpers';

export let filteredNotes = [...initialsNotes];

export const deleteNote = function (e) {
  e.stopPropagation();
  const deleteNoteIndex = Number(e.currentTarget.id.replace(/del_/g, ''));
  filteredNotes = filteredNotes.filter(note => note.id !== deleteNoteIndex);
  createActiveNotesListMarkup(filteredNotes);
  createNotesCategoryListMarkup(filteredNotes);
  setElementsListeners();
  document.body.classList.remove('show-modal');
};

export const archiveNote = function (e) {
  e.stopPropagation();
  const archiveNoteIndex = Number(e.currentTarget.id.replace(/arch_/g, ''));
  filteredNotes.filter(note => {
    if (note.id === archiveNoteIndex) {
      note.archived = true;
    }
  });
  createActiveNotesListMarkup(filteredNotes);
  createNotesCategoryListMarkup(filteredNotes);
  setElementsListeners();
  document.body.classList.remove('show-modal');
};

export const unArchiveNote = function (e) {
  e.stopPropagation();
  const category = e.currentTarget.dataset.category === 'Random' ? 'Random Thought' : e.currentTarget.dataset.category;
  const unArchiveNoteIndex = Number(e.currentTarget.id.replace(/unarch_/g, ''));
  filteredNotes.filter(note => {
    if (note.id === unArchiveNoteIndex) {
      note.archived = false;
    }
  });
  createActiveNotesListMarkup(filteredNotes);
  createNotesCategoryListMarkup(filteredNotes);
  openCategoryDetailsFormMarkup(category);
  setElementsListeners();
};

export const openNote = function (e) {
  e.preventDefault();
  const id = Number(e.currentTarget.id);
  openModal();
  openNoteDetailsMarkup(id);
  setElementsListeners();
};

export const openCategory = function (e) {
  e.preventDefault();
  const id = e.currentTarget.id === 'Random' ? 'Random Thought' : e.currentTarget.id;
  openModal();
  openCategoryDetailsFormMarkup(id);
  setElementsListeners();
};

export const createNote = function () {
  openModalForm('Create Note');
  newNoteForm.reset();
  setElementsListeners();
};

export const submitCreatingNote = function (e) {
  e.preventDefault();
  if (nameInput.value.trim() === '') {
    alert('"Note name" is required');
    return;
  }
  if (contentInput.value.trim() === '') {
    alert('"Note description" is required');
    return;
  }
  if (Array.from(categoryInput).filter(input => input.checked).length !== 1) {
    alert('"Category" is required');
    return;
  }
  const newNote = getFormValue(filteredNotes);
  filteredNotes.push(newNote);
  createActiveNotesListMarkup(filteredNotes);
  createNotesCategoryListMarkup(filteredNotes);
  setElementsListeners();
  onCloseModal();
};

export const editNote = function (e) {
  e.stopPropagation();
  const editNoteIndex = Number(e.currentTarget.id.replace(/ed_/g, ''));
  const editNote = filteredNotes.filter(note => note.id === editNoteIndex)[0];
  openModalForm('Edit Note', editNoteIndex);
  document.body.classList.remove('show-modal');
  setFormValue(editNote);
  setElementsListeners();
};

export const submitEditingNote = function (e) {
  e.preventDefault();
  if (nameInput.value.trim() === '') {
    alert('"Note name" is required');
    return;
  }
  if (contentInput.value.trim() === '') {
    alert('"Note description" is required');
    return;
  }
  if (Array.from(categoryInput).filter(input => input.checked).length !== 1) {
    alert('"Category" is required');
    return;
  }
  const editedNote = getFormValue(filteredNotes);
  const editNoteIndex = Number(document.querySelector('.modal__form-submit.js-edit').dataset.noteid);

  filteredNotes = filteredNotes.map(note => {
    if (note.id === editNoteIndex) {
      editedNote.dates = Array.from(new Set([...note.dates, ...editedNote.dates]));

      return { ...note, ...editedNote };
    } else {
      return note;
    }
  });
  createActiveNotesListMarkup(filteredNotes);
  createNotesCategoryListMarkup(filteredNotes);
  document.body.classList.remove('show-modal-form');
  setElementsListeners();
  onCloseModal();
};
