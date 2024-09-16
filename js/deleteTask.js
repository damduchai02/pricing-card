export function deleteTask(e) {
  // Find and Delete element li in Task List
  const selectedItem = e.target.parentElement.parentElement;
  selectedItem.remove();

  // Delete item in Todo List
  const todoItems = document.querySelectorAll('.todo-item');
  todoItems.forEach((item) => {
    if (item.getAttribute('key') === selectedItem.getAttribute('key')) {
      item.remove();
    }
  });
}
