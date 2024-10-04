// Get Arrays from localStorage if available

export function getSavedColumns(listCardArrays) {
  let newArray = listCardArrays;

  if (localStorage.getItem('board')) {
    newArray = JSON.parse(localStorage.getItem('board'));
  }

  return newArray;
}
