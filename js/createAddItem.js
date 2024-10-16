import { updateItem } from './utils.js';

export function createAddItem(listCardArrays, updateDOM) {
  const div = document.createElement('div');
  div.className = 'add-item-container';

  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'add-text';
  input.placeholder = 'Add Item...';

  const button = document.createElement('button');
  button.className = 'plus-button';
  button.textContent = '+';

  button.addEventListener('click', async function (e) {
    const itemText = input.value.trim();
    const cardColumn = e.target.closest('.card-column');

    if (itemText) {
      const selectedCardArray = listCardArrays.find(
        (card) => card.id === cardColumn.id
      );

      selectedCardArray.items.push(itemText);

      await updateItem(selectedCardArray, updateDOM);
    }
  });

  div.appendChild(input);
  div.appendChild(button);

  return div;
}
