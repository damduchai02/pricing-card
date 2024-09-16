const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task');
const clientInput = document.getElementById('client');
const priorityInput = document.getElementById('priority');
const effortInput = document.getElementById('effort');
const dateInput = document.getElementById('date');
const formBtn = document.getElementById('btn-form');

export let isEditMode = false;

export function editTask(e) {
  isEditMode = true;

  [...taskList.children].forEach((item) => item.classList.remove('edit'));

  // get element li
  let selectedItem = e.target.parentElement.parentElement;
  selectedItem.classList.add('edit');
  //   Set value form
  taskInput.value = selectedItem.children[0].children[0].textContent;
  clientInput.value = selectedItem.children[0].children[3].textContent;
  dateInput.value = selectedItem.children[0].children[1].textContent;
  priorityInput.value = selectedItem
    .getAttribute('priority-effort')
    .split('-')[0];
  effortInput.value = selectedItem
    .getAttribute('priority-effort')
    .split('-')[1];
  formBtn.textContent = 'Update Task';
}
