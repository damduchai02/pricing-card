'use strict';

import { renderCard } from './renderCard.js';

const e_cardsContainer = document.getElementById('cards-container');

const e_addCardText = document.getElementById('add-card-text');
const e_addCardButton = document.getElementById('add-card-button');

const e_cardContextMenu = document.getElementById('card-context-menu');
const e_cardContextMenuDelete = document.getElementById(
  'card-context-menu-delete'
);
const e_cardContextMenuClear = document.getElementById(
  'card-context-menu-clear'
);
const e_cardContextMenuDuplicate = document.getElementById(
  'card-context-menu-duplicate'
);

// Variables
let draggableItem = null;
let cardStart = null;
let cardContextMenu_currentCard;

// Functions
function getCardFromElement(element) {
  return board.cards.find((e) => e.id === element.id);
}

function getMouseOverCard() {
  // The card the mouse cursor is currently over.
  return document.querySelectorAll('.parent-card:hover')[0];
}

function cardContextMenu_show(e) {
  cardContextMenu_currentCard = getMouseOverCard();

  const { clientX: mouseX, clientY: mouseY } = e;
  e_cardContextMenu.style.top = mouseY + 10 + 'px';
  e_cardContextMenu.style.left = mouseX + 10 + 'px';

  e_cardContextMenu.classList.remove('visible');
  setTimeout(() => {
    e_cardContextMenu.classList.add('visible');
  }, 0);
}

function cardContextMenu_hide(e) {
  if (
    e.target.offsetParent != e_cardContextMenu &&
    e_cardContextMenu.classList.contains('visible')
  ) {
    e_cardContextMenu.classList.remove('visible');
  }
}

function cardContextMenu_deleteCard() {
  let _currentCardObject = getCardFromElement(cardContextMenu_currentCard);

  // Remove the card from the cards list based on its index position.
  board.cards.splice(board.cards.indexOf(_currentCardObject), 1);

  renderCard(_currentCardObject.id, board.cards);

  e_cardContextMenu.classList.toggle('visible');
}

function cardContextMenu_clearCard() {
  let _currentCardObject = getCardFromElement(cardContextMenu_currentCard);

  _currentCardObject.items.length = 0;
  renderCard(_currentCardObject.id, board.cards);

  e_cardContextMenu.classList.toggle('visible');
}

function cardContextMenu_duplicateCard() {
  let _currentCardObject = getCardFromElement(cardContextMenu_currentCard);

  board.addCard();

  let _cIndex = board.cards.length - 1;
  board.cards[_cIndex].items = _currentCardObject.items;
  board.cards[_cIndex].name = _currentCardObject.name + ' Copy';

  renderCard(board.cards[_cIndex].id, board.cards);

  e_cardContextMenu.classList.toggle('visible');
}

// Classes
class Board {
  constructor(identifier = 0) {
    this.cards = []; // all cards = [{},{}]
    this.identifier = identifier; // create Id element
  }

  uniqueId() {
    this.identifier += 1;
    return 'e' + this.identifier.toString();
  }

  addCard() {
    let _cardTitle = e_addCardText.value.trim();
    e_addCardText.value = '';

    if (!_cardTitle) _cardTitle = `Untitled Card ${this.cards.length + 1}`;

    let _card = new Card(this.uniqueId(), _cardTitle);
    this.cards.push(_card);

    let _newCard = _card.generateElement();

    e_cardsContainer.insertBefore(
      _newCard,
      e_cardsContainer.childNodes[e_cardsContainer.childNodes.length - 2]
    );
  }
}

class Card {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
    renderCard(this.id, board.cards);
  }

  removeItem(item) {
    this.items = this.items.filter((val) => val !== item);
    renderCard(this.id, board.cards);
  }

  renderItems() {
    let _newItemList = document.createElement('ul');
    _newItemList.id = this.id + '-ul';
    for (let _item of this.items) {
      let _newItem = document.createElement('li');
      _newItem.id = _item.id;
      _newItem.draggable = true;

      _newItem.addEventListener('dragstart', () => {
        draggableItem = _newItem;
        cardStart = this;
        setTimeout(() => {
          _newItem.style.display = 'none';
        }, 0);
      });

      _newItem.addEventListener('dragend', () => {
        draggableItem = null;
        setTimeout(() => {
          _newItem.style.display = 'flex';
        }, 0);
      });

      let _newItemTitle = document.createElement('p');
      _newItemTitle.innerText = _item.title;
      _newItemTitle.classList.add('item-title');

      let _newItemButtons = document.createElement('span');

      let _newItemDuplicateButton = document.createElement('i');
      _newItemDuplicateButton.ariaHidden = true;
      _newItemDuplicateButton.classList.add('fa', 'fa-copy');

      let _newItemEditButton = document.createElement('i');
      _newItemEditButton.ariaHidden = true;
      _newItemEditButton.classList.add('fa', 'fa-pencil');

      let _newItemDeleteButton = document.createElement('i');
      _newItemDeleteButton.ariaHidden = true;
      _newItemDeleteButton.classList.add('fa', 'fa-trash');

      _newItemDuplicateButton.addEventListener('click', () => {
        const duplicateItem = { ..._item };
        duplicateItem.id = 'e' + Date.now();
        this.addItem(duplicateItem);
      });

      _newItemEditButton.addEventListener('click', () => {
        // Card item editing functionality.
        let _input = document.createElement('textarea');
        _input.value = _newItemTitle.textContent;
        _input.classList.add('item-title');
        _newItemTitle.replaceWith(_input);
        _input.focus();

        let _save = () => {
          _item.title = _input.value;
          renderCard(this.id, board.cards);
        };

        _input.addEventListener('blur', _save, true);
        _input.addEventListener('keyup', (e) => {
          if (e.code === 'Enter') _save();
        });
      });

      _newItemDeleteButton.addEventListener('click', () => {
        this.removeItem(_item);
      });

      _newItemButtons.appendChild(_newItemDuplicateButton);
      _newItemButtons.appendChild(_newItemEditButton);
      _newItemButtons.appendChild(_newItemDeleteButton);

      _newItem.appendChild(_newItemTitle);
      _newItem.appendChild(_newItemButtons);
      _newItemList.appendChild(_newItem);
    }

    return _newItemList;
  }

  generateElement() {
    //  <div class="parent-card">
    //    <span>
    //        <h2>{this.name}</h2>
    //        <i class="fa fa-bars" aria-hidden="true"></i>
    //    </span>
    //    <ul>
    //        <li><p>{this.items[0]}</p> <span></span></li>
    //        {more_items...}
    //    </ul>
    //  </div>

    let _newCardHeader = document.createElement('span'); // span

    let _newCardHeaderTitle = document.createElement('h2'); // h2
    _newCardHeaderTitle.id = this.id + '-h2';
    _newCardHeaderTitle.innerText = this.name;
    _newCardHeaderTitle.classList.add('card-title');

    _newCardHeaderTitle.addEventListener('click', () => {
      let _input = document.createElement('input');
      _input.value = _newCardHeaderTitle.textContent;
      _input.classList.add('card-title');
      _newCardHeaderTitle.replaceWith(_input);
      _input.focus();

      let _save = () => {
        this.name = _input.value;
        renderCard(this.id, board.cards);
      };

      _input.addEventListener('blur', _save, true);
      _input.addEventListener('keyup', (e) => {
        if (e.code === 'Enter') _save();
      });
    });

    // icon bars
    let _newCardHeaderMenu = document.createElement('i');
    _newCardHeaderMenu.ariaHidden = true;
    _newCardHeaderMenu.classList.add('fa', 'fa-bars');
    _newCardHeaderMenu.addEventListener('click', cardContextMenu_show);

    _newCardHeader.append(_newCardHeaderTitle);
    _newCardHeader.append(_newCardHeaderMenu);

    let _newInput = document.createElement('input');
    _newInput.id = this.id + '-input';
    _newInput.type = 'text';
    _newInput.placeholder = 'Add Task...';
    _newInput.addEventListener('keyup', (e) => {
      if (e.code === 'Enter') _newButton.click();
    });

    let _newButton = document.createElement('button');
    _newButton.id = this.id + '-button';
    _newButton.classList.add('plus-button');
    _newButton.innerText = '+';
    _newButton.addEventListener('click', () => {
      let _inputValue = _newInput.value;
      if (!_inputValue) return alert('Type a name for the item!');
      const _newItem = new Item(board.uniqueId(), _inputValue, this.id);
      this.addItem(_newItem);
    });

    let _newCard = document.createElement('div');
    _newCard.id = this.id;
    _newCard.classList.add('parent-card');
    _newCard.appendChild(_newCardHeader);

    if (this.items) {
      let _newItemList = this.renderItems();
      _newCard.appendChild(_newItemList);
    }

    _newCard.appendChild(_newInput);
    _newCard.appendChild(_newButton);

    _newCard.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    _newCard.addEventListener('drop', () => {
      const itemId = draggableItem.id;
      const card = board.cards.find((card) =>
        card.items.find((item) => item.id === itemId)
      );
      const item = card.items.find((item) => item.id === itemId);
      if (this !== cardStart) {
        this.addItem(item);
        cardStart.removeItem(item);
      }
    });

    return _newCard;
  }
}

class Item {
  constructor(id, title, parentCardId) {
    this.id = id;
    this.title = title;
    this.parentCardId = parentCardId;
  }
}

const board = new Board();

// Events
e_addCardText.addEventListener('keyup', (e) => {
  if (e.code === 'Enter') board.addCard();
});

e_addCardButton.addEventListener('click', () => {
  board.addCard();
});

document.body.addEventListener('click', cardContextMenu_hide);
e_cardContextMenuDelete.addEventListener('click', cardContextMenu_deleteCard);
e_cardContextMenuClear.addEventListener('click', cardContextMenu_clearCard);
e_cardContextMenuDuplicate.addEventListener(
  'click',
  cardContextMenu_duplicateCard
);
