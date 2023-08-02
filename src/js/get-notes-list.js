import { createActiveNotesListMarkup, createNotesCategoryListMarkup } from './markups';
import { setElementsListeners } from './helpers';
import initialsNotes from './notes';

createActiveNotesListMarkup(initialsNotes);
createNotesCategoryListMarkup(initialsNotes);
setElementsListeners();
