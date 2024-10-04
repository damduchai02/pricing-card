const addCardInput = document.getElementById('add-card-input');

export function addCardColumn(listCardArrays, updateDOM) {
  const cardText = addCardInput.value.trim().toLowerCase() || 'untitled';
  addCardInput.value = '';
  const cardId = listCardArrays[listCardArrays.length - 1].id + 1;
  const cardArray = { id: cardId, name: cardText, items: [] };
  listCardArrays.push(cardArray);
  updateDOM();
}
