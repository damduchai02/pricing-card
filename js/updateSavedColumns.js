// Set localStorage Arrays

export function updateSavedColumns(listCardArrays) {
  localStorage.clear();
  listCardArrays.forEach((card, index) => {
    localStorage.setItem(
      card.name + (index + 1),
      JSON.stringify(listCardArrays[index])
    );
  });
}
