import { createItemText } from './createItemText.js';

let debounceTimeout;

export function validateInput(e, checkInput, text) {
  const isChecked = checkInput(e.target.value);

  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {
    if (isChecked) {
      e.target.nextElementSibling?.remove();
    } else {
      const span = createItemText('text-error', text);

      if (!e.target.nextElementSibling) {
        e.target.closest('.form-input-container').appendChild(span);
      }
    }
  }, 500);
}
