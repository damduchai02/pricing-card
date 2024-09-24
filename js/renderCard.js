const e_cardsContainer = document.getElementById('cards-container');

export function renderCard(cardId, cards) {
  let _card = cards.find((e) => e.id === cardId);

  if (!_card) {
    // If card no longer exists in data. (ie: deleted but still rendered in DOM)
    // Remove it from the DOM
    let _currentCardElement = document.getElementById(cardId);
    _currentCardElement.parentNode.removeChild(_currentCardElement);
    return;
  }

  // Get current card element if it exists.
  let _currentCardElement = document.getElementById(_card.id);
  if (_currentCardElement !== null) {
    let _generated = _card.generateElement();
    // Replace the card from the container.
    _currentCardElement.parentNode.replaceChild(
      _generated,
      _currentCardElement
    );
  } else {
    let _generated = _card.generateElement();
    e_cardsContainer.insertBefore(
      _generated,
      e_cardsContainer.childNodes[e_cardsContainer.childNodes.length - 2]
    );
  }
}
