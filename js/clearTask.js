const taskList = document.getElementById('task-list');

export function clearTask() {
  const confirmed = window.confirm(
    'Are you sure you want to delete all items?'
  );

  if (confirmed) {
    taskList.innerHTML = '';
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach((item) => item.remove());
  }
}
