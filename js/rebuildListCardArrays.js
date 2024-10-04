// Allows arrays to reflect Drag and Drop Items

export function rebuildListCardArrays(
  dragColumn,
  dropColumn,
  listCardArrays,
  updateDOM
) {
  resetCardArray(dragColumn, listCardArrays);
  resetCardArray(dropColumn, listCardArrays);
  updateDOM();
}

function resetCardArray(column, listCardArrays) {
  const itemsList = column.querySelectorAll('.card-item');
  const itemsListArray = Array.from(itemsList).map((item) => item.textContent);
  const cardArray = listCardArrays.find((card) => card.id === +column.id);
  cardArray.items = itemsListArray;
}
