import { taskIcon, thoughtIcon, ideaIcon, binIcon, editIcon, archiveIcon } from './svg-code';
import { textCutter } from './helpers';

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

      return `<li class="notes-category__list-item">      
          <div class="notes-category__list-item-icon">${categoryIcon(category)}</div>
          <span class="notes-category__category">${category}</span>
          <span class="notes-category__active">${activeNotes}</span>
          <span class="notes-category__archive">${archivedNotes}</span>          
        </li>`;
    })
    .join('');

  notesCategoryList.insertAdjacentHTML('beforeend', markup);
};
