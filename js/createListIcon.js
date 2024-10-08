import { createIcon } from './createIcon.js';
import { replaceText } from './replaceText.js';
import { updateItem } from './utils.js';

export function createListIcon(
  classes,
  index,
  itemText,
  listCardArrays,
  updateDOM
) {
  const span = document.createElement('span');
  span.className = classes;

  const duplicateIcon = createIcon('fa fa-copy');
  duplicateIcon.addEventListener('click', async function (e) {
    const selectedCardArray = findCardArray(e, listCardArrays);
    const itemText = selectedCardArray.items[index];

    selectedCardArray.items.push(itemText);

    await updateItem(selectedCardArray);

    updateDOM();
  });

  const editIcon = createIcon('fa fa-pencil');
  editIcon.addEventListener('click', function () {
    const input = replaceText('item-title', itemText, itemText.textContent);

    let save = async (e) => {
      const textEdit = input.value.trim();
      const selectedCardArray = findCardArray(e, listCardArrays);

      selectedCardArray.items.splice(index, 1, textEdit);

      await updateItem(selectedCardArray);

      updateDOM();
    };

    input.addEventListener('blur', save, true);
  });

  const deleteIcon = createIcon('fa fa-trash');
  deleteIcon.addEventListener('click', async function (e) {
    const selectedCardArray = findCardArray(e, listCardArrays);
    selectedCardArray.items.splice(index, 1);

    await updateItem(selectedCardArray);

    updateDOM();
  });

  span.appendChild(duplicateIcon);
  span.appendChild(editIcon);
  span.appendChild(deleteIcon);

  return span;
}

function findCardArray(e, listCardArrays) {
  const cardColumn = e.target.closest('.card-column');
  const selectedCardArray = listCardArrays.find(
    (card) => card.id === cardColumn.id
  );

  return selectedCardArray;
}
