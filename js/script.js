'use strict';

import { createTask } from './createTask.js';
import { deleteTask } from './deleteTask.js';
import { clearTask } from './clearTask.js';
import { dragAndDrop } from './dragAndDrop.js';
import { duplicateTask } from './duplicateTask.js';
import { filterTask } from './filterTask.js';
import { sortTaskAZ, sortTaskZA } from './sortTask.js';
import { editTask } from './editTask.js';

const taskFilter = document.getElementById('filter');

const taskSortAZBtn = document.getElementById('sort-az');
const taskSortZABtn = document.getElementById('sort-za');

const form = document.getElementById('form');
const taskList = document.getElementById('task-list');

const deleteSelectedBtn = document.getElementById('delete-selected');
const clearBtn = document.getElementById('clear');

// Create Task
form.addEventListener('submit', createTask);

// Filter Task
taskFilter.addEventListener('input', filterTask);

// Sort Task
taskSortAZBtn.addEventListener('click', sortTaskAZ);
taskSortZABtn.addEventListener('click', sortTaskZA);

// Edit, Duplicate, Delete Task
taskList.addEventListener('click', function (e) {
  // Edit
  if (e.target.getAttribute('id') === 'edit') {
    editTask(e);
  }
  // Duplicate
  if (e.target.getAttribute('id') === 'duplicate') {
    duplicateTask(e);
  }
  // Delete
  if (e.target.getAttribute('id') === 'delete') {
    deleteTask(e);
  }
});

// Delete Task Selected
let taskListSelected = []; // arr contains element selected

taskList.addEventListener('change', function (e) {
  if (e.target.checked) {
    taskListSelected.push(e.target.parentElement);
  } else {
    taskListSelected = taskListSelected.filter(
      (item) => item.parentElement.key !== e.target.parentElement.key
    );
  }
});

deleteSelectedBtn.addEventListener('click', function () {
  // Delete element in task list
  [...taskListSelected].map((item) => item.remove());
  const arrayKey = taskListSelected.map((item) => item.getAttribute('key'));
  taskListSelected = [];

  // Delete element in todo list
  const todoItems = document.querySelectorAll('.todo-item');
  todoItems.forEach((item) => {
    if (arrayKey.includes(item.getAttribute('key'))) {
      item.remove();
    }
  });
});

// Clear Task
clearBtn.addEventListener('click', clearTask);

// Drag and Drop
dragAndDrop();
