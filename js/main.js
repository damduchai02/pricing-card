import { createCardColumn } from './createCardColumn.js';
import { addCardColumn } from './addCardColumn.js';
import { getTodosFormServer } from './getTodosFromServer.js';

// DOM element
const addCardButton = document.getElementById('add-card-button');

let listCardArrays = await getTodosFormServer();

// Update Columns in DOM - Reset HTML, Update localStorage
async function updateDOM() {
  let listCardArrays = await getTodosFormServer();

  // Remove Card Columns
  const listCardColumns = document.querySelectorAll('.card-column');
  listCardColumns.forEach((item) => item.remove());

  // Render Card Columns
  listCardArrays.forEach((card) => {
    createCardColumn(card, listCardArrays, updateDOM);
  });
}

// Add Card Column
addCardButton.addEventListener('click', function () {
  addCardColumn(listCardArrays, updateDOM);
});

// Render UI
updateDOM();
