import { replaceText } from './replaceText.js';

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

      const updateCardTitle = async function () {
        await fetch(
          `https://67049867ab8a8f8927343368.mockapi.io/api/todos/${selectedCardArray.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedCardArray),
          }
        );
      };

      await updateCardTitle();

      updateDOM();
    };

    input.addEventListener('blur', save, true);
  });

  span.appendChild(h2);

  return span;
}
