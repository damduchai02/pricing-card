export function replaceText(classes, target, text) {
  const input = document.createElement('textarea');
  input.className = classes;
  input.value = text;
  target.replaceWith(input);
  input.focus();

  return input;
}
