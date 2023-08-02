export const textCutter = function (text, maxSymbolsNumber) {
  if (text.length - 3 > maxSymbolsNumber) {
    return text.slice(0, maxSymbolsNumber) + '...';
  } else {
    return text;
  }
};

export const getFormValue = function (filteredNotes) {
  const categoryValue = Array.from(document.querySelectorAll('.form__radio-input')).filter(input => input.checked)[0].value;
  const nameValue = document.querySelector('.form__input-name').value;
  const dateValue = document.querySelector('.form__input-date').value;
  const contentValue = document.querySelector('.form__textarea').value;
  const idValue =
    Number(
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
