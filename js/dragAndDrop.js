const leftBox = document.getElementById('left');
const rightBox = document.getElementById('right');

// Drag and Drop
export function dragAndDrop() {
  left.addEventListener('dragstart', function (e) {
    let selected = e.target;

    rightBox.addEventListener('dragover', function (e) {
      e.preventDefault();
    });

    rightBox.addEventListener('drop', function (e) {
      if (selected !== null) {
        rightBox.appendChild(selected);
        selected = null;
      }
    });
  });

  right.addEventListener('dragstart', function (e) {
    let selected = e.target;

    leftBox.addEventListener('dragover', function (e) {
      e.preventDefault();
    });

    leftBox.addEventListener('drop', function (e) {
      if (selected !== null) {
        leftBox.appendChild(selected);
        selected = null;
      }
    });
  });
}
