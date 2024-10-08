import { createItemText } from './createItemText.js';
import { createListIcon } from './createListIcon.js';

export let draggedItem;
export let dragColumn;

export function createItemEl(item, index, listCardArrays, updateDOM) {
  const itemEl = document.createElement('li');
  itemEl.className = 'card-item';
  itemEl.draggable = true;

  const itemText = createItemText('item-title', item);
  const listIcon = createListIcon(
    'icon-list',
    index,
    itemText,
    listCardArrays,
    updateDOM
  );

  itemEl.appendChild(itemText);
  itemEl.appendChild(listIcon);

  itemEl.addEventListener('dragstart', dragStart);

  return itemEl;
}

// When Item Starts Dragging
function dragStart() {
  draggedItem = this;
  dragColumn = this.closest('.card-column');
}
