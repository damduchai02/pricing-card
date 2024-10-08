export function createItemText(classes, text) {
  const span = document.createElement('span');
  span.className = classes;
  span.textContent = text;

  return span;
}
