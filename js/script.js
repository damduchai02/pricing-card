"use strict";

// Form
const form = document.querySelector(".form");
const taskInput = document.querySelector(".form__task");
const clientInput = document.querySelector(".form__client");
const priorityInput = document.querySelector(".form__priority");
const effortInput = document.querySelector(".form__effort");
const dateInput = document.querySelector(".form__date");
const formBtn = document.querySelector(".form__button");

// Filter
const taskFilter = document.querySelector(".filter__input");

// Sort
const taskSortAZ = document.querySelector(".btn-az");
const taskSortZA = document.querySelector(".btn-za");
const taskSortDefault = document.querySelector(".btn-default");

// Task List
const taskList = document.querySelector(".task__list");
const deleteSelectedBtn = document.querySelector(".btn-delete-selected");
const clearBtn = document.querySelector(".btn-clear");

// Todo List
const todoList = document.querySelector(".todo__list");
const todoDone = document.querySelector(".todo__done");
const leftBox = document.getElementById("left");
const rightBox = document.getElementById("right");

let isEditMode = false;

// Render level UI
function renderLevel() {
  const newPriority = priorityInput.value;
  const newEffort = effortInput.value;
  let levels = [];
  let priorityEffort;

  switch (newPriority) {
    case "high":
      switch (newEffort) {
        case "easy":
          levels = ["red", "gray", "gray"];
          priorityEffort = "high-easy";
          break;
        case "moderate":
          levels = ["red", "red", "gray"];
          priorityEffort = "high-moderate";
          break;
        case "hard":
          levels = ["red", "red", "red"];
          priorityEffort = "high-hard";
          break;
        default:
          levels = [];
          priorityEffort = "high-easy";
      }
      break;

    case "medium":
      switch (newEffort) {
        case "easy":
          levels = ["yellow", "gray", "gray"];
          priorityEffort = "medium-easy";
          break;
        case "moderate":
          levels = ["yellow", "yellow", "gray"];
          priorityEffort = "medium-moderate";
          break;
        case "hard":
          levels = ["yellow", "yellow", "yellow"];
          priorityEffort = "medium-hard";
          break;
        default:
          levels = [];
          priorityEffort = "medium-easy";
      }
      break;

    case "low":
      switch (newEffort) {
        case "easy":
          levels = ["blue", "gray", "gray"];
          priorityEffort = "low-easy";
          break;
        case "moderate":
          levels = ["blue", "blue", "gray"];
          priorityEffort = "low-moderate";
          break;
        case "hard":
          levels = ["blue", "blue", "blue"];
          priorityEffort = "low-hard";
          break;
        default:
          levels = [];
          priorityEffort = "low-easy";
      }
      break;
    default:
      levels = [];
      priorityEffort = "low-easy";
  }

  return { levels, priorityEffort };
}

// Reset Form
function reset() {
  // taskInput.value = "";
  // clientInput.value = "";
  priorityInput.value = "high";
  effortInput.value = "easy";
  dateInput.value = "mon";
  formBtn.textContent = "Create Task";
}

function addTask(e) {
  e.preventDefault();
  let key = Date.now();
  const newTask = taskInput.value;
  const newClient = clientInput.value;
  const newDate = dateInput.value;
  const levels = renderLevel().levels;
  const priorityEffort = renderLevel().priorityEffort;

  const replacedTask = [...taskList.children].find((item) =>
    item.className.includes("edit")
  );

  if (replacedTask) {
    key = replacedTask.getAttribute("key");
  }

  if (!newTask || !newClient) {
    alert("Please type input task or client!!!");
    return;
  }

  const taskHtml = `<li key=${key} class="task__item" priority-effort=${priorityEffort}>
              <h3 class="task__name">${newTask}</h3>
              <div class="task__content">
                <div class="task__date date-${levels[0]}">${newDate}</div>
                <div class="task__effort">
                  <div class="effort-${levels[0]}"></div>
                  <div class="effort-${levels[1]}"></div>
                  <div class="effort-${levels[2]}"></div>
                </div>
                <p class="task__client">${newClient}</p>
              </div>
              <div class="task__button">
                <button class="btn btn-edit">Edit</button>
                <button class="btn btn-duplicate">Duplicate</button>
                <button class="btn btn-delete">Delete</button>
              </div>
               <input type="checkbox" class="task__checkbox" />
            </li>`;

  const todoHtml = `<div key=${key} class="todo__item" draggable="true">
              <h3 class="todo__name">${newTask}</h3>
              <div class="todo__content">
                <div class="todo__date date-${levels[0]}">${newDate}</div>
                <div class="todo__effort">
                 <div class="effort-${levels[0]}"></div>
                  <div class="effort-${levels[1]}"></div>
                  <div class="effort-${levels[2]}"></div>
                </div>
                <p class="todo__client">${newClient}</p>
              </div>
            </div>`;

  const tempTask = document.createElement("div");
  tempTask.innerHTML = taskHtml;
  const task = tempTask.firstChild;

  const tempTodo = document.createElement("div");
  tempTodo.innerHTML = todoHtml;
  const todo = tempTodo.firstChild;

  if (isEditMode) {
    const replacedTask = [...taskList.children].find((item) =>
      item.className.includes("edit")
    );

    const replacedTodoList = [...todoList.children].find(
      (item) => item.getAttribute("key") === replacedTask.getAttribute("key")
    );

    const replacedTodoDone = [...todoDone.children].find(
      (item) => item.getAttribute("key") === replacedTask.getAttribute("key")
    );

    taskList.replaceChild(task, replacedTask);

    if (replacedTodoList) {
      todoList.replaceChild(todo, replacedTodoList);
    }

    if (replacedTodoDone) {
      todoDone.replaceChild(todo, replacedTodoDone);
    }

    isEditMode = false;
    reset();
  } else {
    taskList.appendChild(task);
    todoList.appendChild(todo);
  }

  reset();

  console.log("success");
}

form.addEventListener("submit", addTask);

// Filter
taskFilter.addEventListener("input", function (e) {
  const tasks = document.querySelectorAll("li");
  const text = e.target.value.toLowerCase();
  tasks.forEach((task) => {
    const taskName = task.children[0].textContent.toLowerCase();
    if (taskName.indexOf(text) != -1) {
      task.style.display = "grid";
    } else {
      task.style.display = "none";
    }
  });
});

// Sort
taskSortDefault.addEventListener("click", function () {
  const tasks = Array.from(document.getElementsByTagName("li"));
  const taskList = document.querySelector(".task__list");
  tasks.sort((a, b) => {
    const keyA = a.getAttribute("key");
    const keyB = b.getAttribute("key");
    if (keyA < keyB) {
      return -1;
    }
    if (keyA > keyB) {
      return 1;
    }
    return 0;
  });
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    taskList.appendChild(task);
  });
});

taskSortAZ.addEventListener("click", function () {
  const tasks = Array.from(document.getElementsByTagName("li"));
  const taskList = document.querySelector(".task__list");

  tasks.sort((a, b) => {
    const nameA = a.children[0].textContent.toLowerCase();
    const nameB = b.children[0].textContent.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  taskList.innerHTML = "";
  tasks.forEach((task) => {
    taskList.appendChild(task);
  });
});

taskSortZA.addEventListener("click", function () {
  const tasks = Array.from(document.getElementsByTagName("li"));
  const taskList = document.querySelector(".task__list");

  tasks.sort(function (a, b) {
    const nameA = a.children[0].textContent.toLowerCase();
    const nameB = b.children[0].textContent.toLowerCase();
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }
    return 0;
  });

  taskList.innerHTML = "";
  tasks.forEach((task) => {
    taskList.appendChild(task);
  });
});

// Delete Task List Selected
let taskListSelected = [];

taskList.addEventListener("change", function (e) {
  if (e.target.checked) {
    taskListSelected.push(e.target.parentElement);
  } else {
    taskListSelected = taskListSelected.filter(
      (item) => item.parentElement.key !== e.target.parentElement.key
    );
  }
});

deleteSelectedBtn.addEventListener("click", function () {
  [...taskListSelected].map((item) => item.remove());
  const arrayKey = taskListSelected.map((item) => item.getAttribute("key"));
  taskListSelected = [];

  const todoItems = document.querySelectorAll(".todo__item");
  todoItems.forEach((item) => {
    if (arrayKey.includes(item.getAttribute("key"))) {
      item.remove();
    }
  });
});

// Clear Task
clearBtn.addEventListener("click", function () {
  const confirmed = window.confirm(
    "Are you sure you want to delete all items?"
  );

  if (confirmed) {
    taskList.innerHTML = "";
    const todoItems = document.querySelectorAll(".todo__item");
    todoItems.forEach((item) => item.remove());
    reset();
  }
});

// Edit task
let prevKey;
let prevItem;

function editTask(e) {
  if (prevKey !== e.target.parentElement.parentElement.getAttribute("key")) {
    isEditMode = false;
    prevKey = e.target.parentElement.parentElement.getAttribute("key");
  }

  if (!isEditMode) {
    isEditMode = true;
    const prevItem = [...taskList.children].find((item) =>
      item.className.includes("edit")
    );

    if (prevItem) {
      prevItem.children[2].children[1].disabled = false;
      prevItem.children[2].children[2].disabled = false;
      prevItem.children[3].disabled = false;
    }

    [...taskList.children].forEach((item) => item.classList.remove("edit"));

    let selected = e.target.parentElement.parentElement;
    selected.classList.add("edit");
    taskInput.value = selected.children[0].textContent;
    clientInput.value = selected.children[1].children[2].textContent;
    dateInput.value = selected.children[1].children[0].textContent;
    priorityInput.value = selected
      .getAttribute("priority-effort")
      .split("-")[0];
    effortInput.value = selected.getAttribute("priority-effort").split("-")[1];
    formBtn.textContent = "Update Task";
    selected.children[2].children[1].disabled = true;
    selected.children[2].children[2].disabled = true;
    selected.children[3].disabled = true;
    selected.children[3].checked = false;
    taskListSelected = taskListSelected.filter(
      (item) => item.key !== selected.key
    );

    console.log("edit");
  } else {
    isEditMode = false;
    let selected = e.target.parentElement.parentElement;
    selected.classList.remove("edit");
    selected.children[2].children[1].disabled = false;
    selected.children[2].children[2].disabled = false;
    selected.children[3].disabled = false;
    reset();
  }
}

// Duplicate Task
function duplicateTask(e) {
  const key = Date.now();
  const item = e.target.parentElement.parentElement;
  const newItem = item.cloneNode(true);
  newItem.setAttribute("key", key);
  newItem.children[3].checked = false;
  taskList.appendChild(newItem);

  const todoItem = newItem.cloneNode(true);
  const todoName = todoItem.children[0].textContent;
  const todoContent = todoItem.children[1].children;

  todoItem.children[1].classList.remove("task__content");
  todoItem.children[1].classList.add("todo__content");
  todoContent[0].classList.remove("task__date");
  todoContent[0].classList.add("todo__date");
  todoContent[1].classList.remove("task__effort");
  todoContent[1].classList.add("todo__effort");
  todoContent[2].classList.remove("task__client");
  todoContent[2].classList.add("todo__client");

  const todo = `<div key=${key} class="todo__item" draggable="true">
    <h3 class="todo__name">${todoName}</h3>
        ${todoItem.children[1].outerHTML}
    </div>
  </div>`;

  todoList.insertAdjacentHTML("beforeend", todo);
}

// Delete Task
function deleteTask(e) {
  const selectedItem = e.target.parentElement.parentElement;
  selectedItem.remove();
  const todoItems = document.querySelectorAll(".todo__item");
  todoItems.forEach((item) => {
    if (item.getAttribute("key") === selectedItem.getAttribute("key")) {
      item.remove();
    }
  });
}

// Event Button
taskList.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-delete")) {
    deleteTask(e);
  }

  if (e.target.classList.contains("btn-duplicate")) {
    duplicateTask(e);
  }

  if (e.target.classList.contains("btn-edit")) {
    editTask(e);
  }
});

// Drag and Drop
todoList.addEventListener("dragstart", function (e) {
  let selected = e.target;

  rightBox.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  rightBox.addEventListener("drop", function (e) {
    if (selected !== null) {
      rightBox.appendChild(selected);
      selected = null;
    }
  });
});

todoDone.addEventListener("dragstart", function (e) {
  let selected = e.target;

  leftBox.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  leftBox.addEventListener("drop", function (e) {
    if (selected !== null) {
      leftBox.appendChild(selected);
      selected = null;
    }
  });
});
