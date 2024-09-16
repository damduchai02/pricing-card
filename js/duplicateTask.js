const taskList = document.getElementById('task-list');
const leftBox = document.getElementById('left');

export function duplicateTask(e) {
  const key = Date.now();
  // Find element li in Task List
  const item = e.target.parentElement.parentElement;
  const newItem = item.cloneNode(true);
  // if element checked = true set newItem checked = false
  newItem.children[2].checked = false;
  newItem.setAttribute('key', key);
  taskList.appendChild(newItem);
  //   Find element li in Todo List
  const todoItems = document.querySelectorAll('.todo-item');
  const todo = [...todoItems].find(
    (i) => i.getAttribute('key') === item.getAttribute('key')
  );
  const newTodo = todo.cloneNode(true);
  newTodo.setAttribute('key', key);
  leftBox.appendChild(newTodo);
}
