import { taskIcon, thoughtIcon, ideaIcon, binIcon, editIcon, archiveIcon, unArchiveIcon } from './svg-code';
import { textCutter } from './helpers';
import { filteredNotes } from './note-actions';

const modal = document.getElementById('modal__note');
const activeNotesList = document.querySelector('.notes-active__list');
const notesCategoryList = document.querySelector('.notes-category__list');

export const createActiveNotesListMarkup = function (notes) {
  activeNotesList.innerHTML = '';
  const activeNotes = notes.filter(note => !note.archived);

  const markup = activeNotes
    .map(item => {
      const { name, created, category, content, dates, id } = item;

      const categoryIcon = category => {
        switch (category) {
          case 'Task':
            return taskIcon;
          case 'Idea':
            return ideaIcon;
          case 'Random Thought':
            return thoughtIcon;
          default:
        }
      };

      return `<li id=${id} class="notes-active__list-item">      
          <div class="notes-active__list-item-icon">${categoryIcon(item.category)}</div>
          <span class="notes-active__name">${textCutter(name, 20)}</span>
          <span class="notes-active__create">${created}</span>
          <span class="notes-active__category">${category}</span>
          <span class="notes-active__content">${textCutter(content, 30)}</span>
          <span class="notes-active__date">${dates}</span>
          <div class="button-wrapper">
            <button id=${'ed_' + id} class="button__edit-note" type="button">${editIcon}</button>
            <button id=${'arch_' + id} class="button__archive-note" type="button">${archiveIcon}</button>
            <button id=${'del_' + id} class="button__delete-note" type="button">${binIcon}</button>
          </div>
        </li>`;
    })
    .join('');

  activeNotesList.insertAdjacentHTML('beforeend', markup);
};

export const createNotesCategoryListMarkup = function (notes) {
  notesCategoryList.innerHTML = '';
  const notesCategory = Array.from(new Set(notes.map(note => note.category)));

  const markup = notesCategory
    .map(category => {
      const archivedNotes = notes.reduce((acc, note) => {
        if (note.category === category && note.archived === true) {
          return (acc += 1);
        }
        return acc;
      }, 0);
      const activeNotes = notes.reduce((acc, note) => {
        if (note.category === category && note.archived === false) {
          return (acc += 1);
        }
        return acc;
      }, 0);

      const categoryIcon = category => {
        switch (category) {
          case 'Task':
            return taskIcon;
          case 'Idea':
            return ideaIcon;
          case 'Random Thought':
            return thoughtIcon;
          default:
        }
      };

      return `<li id=${category} class="notes-category__list-item">      
          <div class="notes-category__list-item-icon">${categoryIcon(category)}</div>
          <span class="notes-category__category">${category}</span>
          <span class="notes-category__active">${activeNotes}</span>
          <span class="notes-category__archive">${archivedNotes}</span>          
        </li>`;
    })
    .join('');

  notesCategoryList.insertAdjacentHTML('beforeend', markup);
};

export const openNoteDetailsMarkup = function (id) {
  modal.innerHTML = '';

  const markup = filteredNotes
    .filter(note => note.id === id)
    .map(item => {
      const { name, created, category, content, dates, archived } = item;
      const status = archived ? 'Archived' : 'Active';

      const categoryIcon = category => {
        switch (category) {
          case 'Task':
            return taskIcon;
          case 'Idea':
            return ideaIcon;
          case 'Random Thought':
            return thoughtIcon;
          default:
        }
      };

      return `<div class="note">
          <div class="note__head-wrapper">
            <div class="note__category-wrapper">    
            <div class="note__category-icon">${categoryIcon(category)}</div>
            <span class="note__category">${category}</span>
            </div>
            <div class="note__title-wrapper">
            <span class="note__title">${name}</span>
            <span class="note__create">${created}</span>
            </div>  
          </div>
          <span class="note__content">${content}</span>
           <div class="note__block-wrapper">
              <div class="note__info-wrapper">
              <span class="note__date">Deadline: ${dates}</span>
              <span class="note__status">Status: ${status}</span>
              </div>
              <div class="note__button-wrapper">
                <button id=${'ed_' + id} class="button__edit-note" type="button">${editIcon}</button>
                <button id=${'arch_' + id} class="button__archive-note" type="button">${archiveIcon}</button>
                <button id=${'del_' + id}  class="button__delete-note" type="button">${binIcon}</button>
              </div>
           </div>
        </div>`;
    });

  modal.insertAdjacentHTML('beforeend', markup);
};

export const openCategoryDetailsFormMarkup = function (category) {
  modal.innerHTML = '';
  const categoryIcon = category => {
    switch (category) {
      case 'Task':
        return taskIcon;
      case 'Idea':
        return ideaIcon;
      case 'Random Thought':
        return thoughtIcon;
      default:
    }
  };

  const categoryNotesList = filteredNotes
    .filter(note => note.category === category)
    .map(item => {
      const { name, archived, id } = item;
      const status = archived ? 'Archived' : 'Active';
      const unArchiveButtonMarkup =
        status === 'Archived'
          ? `<button id=${'unarch_' + id} data-category=${category} class="button__unarchive-note" type="button">${unArchiveIcon}</button>`
          : '';

      return `<li class="category__list-item">                   
            <span class="category__note-name">${name}</span>
            <span class="category__note-status">${status}</span>
            ${unArchiveButtonMarkup}
            </li>`;
    })
    .join('');

  const markup = `<div class="category__wrapper">
           <div class="category__title-wrapper">    
            <div class="category-icon">${categoryIcon(category)}</div>
            <span class="category">${category}</span>
            </div>
            <div class="category__head-wrapper">
            <span class="category__head-name">Name</span>
            <span class="category__head-status">Status</span>
            <span class="category__head-unarchive">Unarchive</span>            
            </div>
            <ul class="category__list">${categoryNotesList}<ul>
            </div>`;

  modal.insertAdjacentHTML('beforeend', markup);
};
