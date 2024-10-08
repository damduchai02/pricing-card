export async function getTodosFormServer() {
  const res = await fetch(
    'https://67049867ab8a8f8927343368.mockapi.io/api/todos'
  );

  const data = await res.json();

  return data;
}
