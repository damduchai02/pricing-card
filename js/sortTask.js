export function sortTaskAZ() {
  const tasks = Array.from(document.getElementsByTagName('li'));
  const taskList = document.getElementById('task-list');

  tasks.sort((a, b) => {
    const nameA = a.children[0].children[0].textContent.toLowerCase();
    const nameB = b.children[0].children[0].textContent.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  taskList.innerHTML = '';
  tasks.forEach((task) => {
    taskList.appendChild(task);
  });
}

export function sortTaskZA() {
  console.log('za');
  const tasks = Array.from(document.getElementsByTagName('li'));
  const taskList = document.getElementById('task-list');

  tasks.sort(function (a, b) {
    const nameA = a.children[0].children[0].textContent.toLowerCase();
    const nameB = b.children[0].children[0].textContent.toLowerCase();
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }
    return 0;
  });

  taskList.innerHTML = '';
  tasks.forEach((task) => {
    taskList.appendChild(task);
  });
}
