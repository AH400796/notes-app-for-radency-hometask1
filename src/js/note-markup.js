import { taskIcon, thoughtIcon, ideaIcon, binIcon, editIcon, archiveIcon } from './svg-code';
import notes from './notes';

const modal = document.getElementById('modal__note');

export const openNoteDetailsMarkup = function (id) {
  modal.innerHTML = '';

  const markup = notes
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

export const openNoteCreateFormMarkup = function (id) {
  modal.innerHTML = '';

  const markup = notes
    .filter(note => note.id === id)
    .map(item => {
      const { name, created, category, content, dates, active, archived } = item;
      const status = archived ? 'Archived' : 'Active';

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
                <button class="button__edit-note" type="button">${editIcon}</button>
                <button class="button__archive-note" type="button">${archiveIcon}</button>
                <button class="button__delete-note" type="button">${binIcon}</button>
              </div>
           </div>
        </div>`;
    });

  modal.insertAdjacentHTML('beforeend', markup);
};
