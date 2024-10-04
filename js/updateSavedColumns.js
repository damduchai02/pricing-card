// Set localStorage Arrays

export function updateSavedColumns(listCardArrays) {
  localStorage.clear();
  localStorage.setItem('board', JSON.stringify(listCardArrays));
}
