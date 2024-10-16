import { updateItem } from './utils.js';

// Allows arrays to reflect Drag and Drop Items
export async function rebuildListCardArrays(
  dragColumn,
  dropColumn,
  listCardArrays,
  updateDOM
) {
  await resetCardArray(dragColumn, listCardArrays, updateDOM);
  await resetCardArray(dropColumn, listCardArrays, updateDOM);
}

async function resetCardArray(column, listCardArrays, updateDOM) {
  const itemsList = column.querySelectorAll('.card-item');
  const itemsListArray = Array.from(itemsList).map((item) => item.textContent);
  const cardArray = listCardArrays.find((card) => card.id === column.id);
  cardArray.items = itemsListArray;

  await updateItem(cardArray, updateDOM);
}
