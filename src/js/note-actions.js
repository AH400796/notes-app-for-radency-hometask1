import initialsNotes from './notes';
import { openModal } from './modal';
import { openModalForm, onCloseModal } from './modal-form';
import { createActiveNotesListMarkup, createNotesCategoryListMarkup, openNoteDetailsMarkup, openCategoryDetailsFormMarkup } from './markups';
import { getFormValue } from './helpers';
import { setElementsListeners } from './helpers';

export let filteredNotes = [...initialsNotes];
const newNoteForm = document.querySelector('.form');

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
  openModalForm();
  newNoteForm.reset();
  setElementsListeners();
};

export const submitCreatingNote = function (e) {
  e.preventDefault();
  filteredNotes.push(getFormValue(filteredNotes));
  createActiveNotesListMarkup(filteredNotes);
  createNotesCategoryListMarkup(filteredNotes);
  setElementsListeners();
  onCloseModal();
};
