// Get Arrays from localStorage if available

export function getSavedColumns(listCardArrays) {
  let newArray = listCardArrays;

  if (localStorage.length) {
    listCardArrays = [];
    for (const [_, value] of Object.entries(localStorage)) {
      listCardArrays.push(JSON.parse(value));
    }
    newArray = listCardArrays.sort((a, b) => a.id - b.id);
  }

  return newArray;
}
