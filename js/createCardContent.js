import { createItemEl } from './createItemEl.js';
import { draggedItem } from './createItemEl.js';
import { dragColumn } from './createItemEl.js';
import { rebuildListCardArrays } from './rebuildListCardArrays.js';

let dropColumn;
let dropList;

export function createCardContent(items, listCardArrays, updateDOM) {
  const div = document.createElement('div');
  div.className = 'card-content';

  const ul = document.createElement('ul');
  ul.className = 'card-item-list';

  ul.addEventListener('dragover', dragOver);
  ul.addEventListener('dragenter', dragEnter);
  ul.addEventListener('drop', function () {
    drop(listCardArrays, updateDOM);
  });

  items.forEach((item, index) => {
    ul.appendChild(createItemEl(item, index, listCardArrays, updateDOM));
  });

  div.appendChild(ul);

  return div;
}

// Column Allows for Item to Drop
function dragOver(e) {
  e.preventDefault();
}

function dragEnter() {
  dropList = this;
}

// Dropping Item in Column
function drop(listCardArrays, updateDOM) {
  dropList.appendChild(draggedItem);
  dropColumn = dropList.closest('.card-column');
  rebuildListCardArrays(dragColumn, dropColumn, listCardArrays, updateDOM);
}
