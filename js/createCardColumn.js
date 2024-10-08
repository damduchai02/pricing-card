import { createCardTitle } from './createCardTitle.js';
import { createCardContent } from './createCardContent.js';
import { createAddItem } from './createAddItem.js';

const cardsContainer = document.getElementById('cards-container');
const addCardContainer = document.getElementById('add-card-container');

export function createCardColumn(card, listCardArrays, updateDOM) {
  const div = document.createElement('div');
  div.className = 'card-column';
  div.id = card.id;

  const cardTitle = createCardTitle(card.name, listCardArrays, updateDOM);
  const cardContent = createCardContent(card.items, listCardArrays, updateDOM);
  const addItem = createAddItem(listCardArrays, updateDOM);

  div.appendChild(cardTitle);
  div.appendChild(cardContent);
  div.appendChild(addItem);

  cardsContainer.insertBefore(div, addCardContainer);
}
