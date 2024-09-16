const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task');
const clientInput = document.getElementById('client');
const priorityInput = document.getElementById('priority');
const effortInput = document.getElementById('effort');
const dateInput = document.getElementById('date');
const formBtn = document.getElementById('btn-form');

const leftBox = document.getElementById('left');
const rightBox = document.getElementById('right');

import { isEditMode } from './editTask.js';

// Reset Form
function reset() {
  taskInput.value = '';
  clientInput.value = '';
  priorityInput.value = 'high';
  effortInput.value = 'easy';
  dateInput.value = 'mon';
  formBtn.value = 'Create Task';
}

export function createTask(e) {
  e.preventDefault();
  let key = Date.now();
  // Get value input
  const newTask = taskInput.value;
  const newClient = clientInput.value;
  const newDate = dateInput.value;
  const newPriority = priorityInput.value;
  const newEffort = effortInput.value;

  const priorityEffort = `${newPriority}-${newEffort}`;

  //   Find Color
  const renderColor =
    newPriority === 'high'
      ? 'red'
      : newPriority === 'medium'
      ? 'yellow'
      : 'blue';

  // Find task edited

  const taskHtml = `<li key=${key} priority-effort=${priorityEffort}
              class="display-f p-2 bg-violet items-center justify-space-around rounded-2"
            >
              <div class="display-f gap-4 items-center">
                <h3 class="text-lg text-capitalize">${newTask}</h3>
                <div class="date-${renderColor}">${newDate}</div>
                <div class="display-f gap-1">
                  <div class="effort-${renderColor}"></div>
                  <div class="effort-${
                    newEffort !== 'easy' ? renderColor : 'gray'
                  }"></div>
                  <div class="effort-${
                    newEffort === 'hard' ? renderColor : 'gray'
                  }"></div>
                </div>
                <p class="text-lg text-capitalize">${newClient}</p>
              </div>
              <div class="display-f gap-1">
                <button id="edit">Edit</button>
                <button id="duplicate">Duplicate</button>
                <button id="delete">Delete</button>
              </div>
              <input type="checkbox" />
            </li>`;

  const todoHtml = `<div
                key=${key}
                class="todo-item display-f flex-column gap-2 bg-slate p-2 rounded-8"
                draggable="true"
              >
                <h3 class="text-lg text-capitalize">${newTask}</h3>
                 <div class="display-f gap-4 items-center">
                <div class="date-${renderColor}">${newDate}</div>
                <div class="display-f gap-1">
                  <div class="effort-${renderColor}"></div>
                  <div class="effort-${
                    newEffort === 'moderate' || 'hard' ? renderColor : 'gray'
                  }"></div>
                  <div class="effort-${
                    newEffort === 'hard' ? renderColor : 'gray'
                  }"></div>
                </div>
                <p class="text-lg text-capitalize">${newClient}</p>
                </div>
                </div>
              </div>`;

  const tempTask = document.createElement('div');
  tempTask.innerHTML = taskHtml;
  const task = tempTask.firstChild;
  taskList.appendChild(task);

  const tempTodo = document.createElement('div');
  tempTodo.innerHTML = todoHtml;
  const todo = tempTodo.firstChild;
  leftBox.appendChild(todo);

  const replacedTask = [...taskList.children].find((item) =>
    item.className.includes('edit')
  );

  if (replacedTask) {
    key = replacedTask.getAttribute('key');
  }

  // Edit Task
  if (isEditMode) {
    const replacedTask = [...taskList.children].find((item) =>
      item.className.includes('edit')
    );

    const replacedTodoList = [...leftBox.children].find(
      (item) => item.getAttribute('key') === replacedTask.getAttribute('key')
    );

    const replacedTodoDone = [...rightBox.children].find(
      (item) => item.getAttribute('key') === replacedTask.getAttribute('key')
    );

    taskList.replaceChild(task, replacedTask);

    if (replacedTodoList) {
      leftBox.replaceChild(todo, replacedTodoList);
    }

    if (replacedTodoDone) {
      rightBox.replaceChild(todo, replacedTodoDone);
    }

    reset();
    isEditMode = false;
  }
}
