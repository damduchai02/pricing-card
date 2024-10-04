import { getSavedColumns } from './getSavedColumns.js';
import { updateSavedColumns } from './updateSavedColumns.js';
import { createCardColumn } from './createCardColumn.js';
import { addCardColumn } from './addCardColumn.js';

// DOM element
const addCardButton = document.getElementById('add-card-button');

// Variables
let updatedOnLoad = false;

let listCardArrays = [
  { id: 1, name: 'todo', items: ['Release the course', 'Sit back and relax'] },
  { id: 2, name: 'doing', items: ['Work on projects', 'Listen to music'] },
  { id: 3, name: 'done', items: ['Being cool', 'Getting stuff done'] },
];

// Update Columns in DOM - Reset HTML, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    listCardArrays = getSavedColumns(listCardArrays);
  }

  // Remove Card Columns
  const listCardColumns = document.querySelectorAll('.card-column');
  listCardColumns.forEach((item) => item.remove());

  // Render Card Columns
  listCardArrays.forEach((card) => {
    createCardColumn(card, listCardArrays, updateDOM);
  });

  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns(listCardArrays);
}

// Add Card Column
addCardButton.addEventListener('click', function () {
  addCardColumn(listCardArrays, updateDOM);
});

// Render UI
updateDOM();
