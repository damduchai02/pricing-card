export function createIcon(classes) {
  const icon = document.createElement('i');
  icon.setAttribute('aria-hidden', true);
  icon.className = classes;

  return icon;
}
