export function filterTask(e) {
  const tasks = document.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  tasks.forEach((task) => {
    const taskName = task.children[0].children[0].textContent.toLowerCase();
    if (taskName.indexOf(text) != -1) {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  });
}
