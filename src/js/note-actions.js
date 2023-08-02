import notes from './notes';
import { openModal } from './modal';
import { openModalForm, onCloseModal } from './modal-form';
import { openNoteDetailsMarkup } from './note-markup';
import { createActiveNotesListMarkup, createNotesCategoryListMarkup } from './notes-markup';
import { getFormValue } from './helpers';

let filteredNotes = [...notes];
const newNoteForm = document.querySelector('.form');

setElementsListeners();

export default function setElementsListeners() {
  const deleteNoteButtons = document.querySelectorAll('.button__delete-note');
  deleteNoteButtons.forEach(button => button.addEventListener('click', deleteNote));

  const archiveNoteButtons = document.querySelectorAll('.button__archive-note');
  archiveNoteButtons.forEach(button => button.addEventListener('click', archiveNote));

  const notes = document.querySelectorAll('.notes-active__list-item');
  notes.forEach(note => note.addEventListener('click', openNote));

  const createNoteButton = document.querySelector('.button__create-note');
  createNoteButton.addEventListener('click', createNote);

  const submitCreatingNewNoteButton = document.querySelector('.modal__form-submit');
  submitCreatingNewNoteButton.addEventListener('click', submitCreatingNote);
}

function deleteNote(e) {
  e.stopPropagation();
  const deleteNoteIndex = Number(e.currentTarget.id.replace(/del_/g, ''));

  filteredNotes = filteredNotes.filter(note => note.id !== deleteNoteIndex);

  createActiveNotesListMarkup(filteredNotes);
  createNotesCategoryListMarkup(filteredNotes);
  setElementsListeners();
  document.body.classList.remove('show-modal');
}

function archiveNote(e) {
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
}

function openNote(e) {
  e.preventDefault();
  const id = Number(e.currentTarget.id);
  openModal();
  openNoteDetailsMarkup(id);
  setElementsListeners();
}

function createNote() {
  openModalForm();
  newNoteForm.reset();
  setElementsListeners();
}

function submitCreatingNote(e) {
  e.preventDefault();
  filteredNotes.push(getFormValue(filteredNotes));
  createActiveNotesListMarkup(filteredNotes);
  createNotesCategoryListMarkup(filteredNotes);
  setElementsListeners();
  onCloseModal();
}
