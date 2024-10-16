import { replaceText } from './replaceText.js';
import { updateItem } from './utils.js';

export function createCardTitle(title, listCardArrays, updateDOM) {
  const span = document.createElement('span');

  const h2 = document.createElement('h2');
  h2.className = 'card-title';
  h2.textContent = title;

  h2.addEventListener('click', function () {
    const input = replaceText('card-title', h2, title);

    let save = async (e) => {
      const textEdit = input.value.trim().toLowerCase();
      const cardColumn = e.target.closest('.card-column');
      const selectedCardArray = listCardArrays.find(
        (card) => card.id === cardColumn.id
      );

      selectedCardArray.name = textEdit;

      await updateItem(selectedCardArray, updateDOM);
    };

    input.addEventListener('blur', save, true);
  });

  span.appendChild(h2);

  return span;
}
