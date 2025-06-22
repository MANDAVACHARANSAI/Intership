// Show only the selected section
function showSection(id) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Toggle dark mode
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}

// Toggle mobile menu
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

// To-Do List Functionality
document.addEventListener('DOMContentLoaded', function () {
  const todoInput = document.getElementById('todoInput');
  const addTodoBtn = document.getElementById('addTodo');
  const todoList = document.getElementById('todoList');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const clearCompletedBtn = document.getElementById('clearCompleted');
  const tasksCount = document.getElementById('tasksCount');

  let todos = [];

  function updateList() {
    todoList.innerHTML = '';
    const filter = document.querySelector('.filter-btn.active').dataset.filter;

    const filteredTodos = todos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });

    filteredTodos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.textContent = todo.text;
      li.style.textDecoration = todo.completed ? 'line-through' : 'none';
      li.onclick = () => {
        todos[index].completed = !todos[index].completed;
        updateList();
      };
      todoList.appendChild(li);
    });

    tasksCount.textContent = `${todos.length} tasks`;
  }

  addTodoBtn.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    const dateValue = document.getElementById("calendar").value;
    const timeValue = document.getElementById("timePicker").value;

    if (!taskText) return;

    let datetimeSuffix = '';
    if (dateValue && timeValue) {
      const formattedDate = new Date(`${dateValue}T${timeValue}`);
      const dateStr = formattedDate.toLocaleDateString(undefined, {
        year: "numeric", month: "short", day: "numeric"
      });
      const timeStr = formattedDate.toLocaleTimeString(undefined, {
        hour: "2-digit", minute: "2-digit"
      });
      datetimeSuffix = ` 🗓️ ${dateStr} at ${timeStr}`;
    }

    todos.push({ text: `${taskText}${datetimeSuffix}`, completed: false });
    todoInput.value = '';
    updateList();
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateList();
    });
  });

  clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    updateList();
  });

  updateList();
});

// Gallery
function addImage() {
  const url = document.getElementById('image-url').value.trim();
  if (url) {
    const img = document.createElement('img');
    img.src = url;
    document.getElementById('gallery').appendChild(img);
    document.getElementById('image-url').value = '';
  }
}
