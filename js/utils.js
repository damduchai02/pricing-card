const url = 'https://67049867ab8a8f8927343368.mockapi.io/api/todos';

export async function createCardColumn(cardArray) {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cardArray),
  });
}

export async function updateItem(cardArray) {
  await fetch(`${url}/${cardArray.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cardArray),
  });
}
