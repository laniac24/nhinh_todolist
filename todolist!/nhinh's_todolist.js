const tasks = [];

const taskInput = document.querySelector('input');
const taskForm = document.querySelector('form');
const submitButton = document.querySelector('#submit');
const taskList = document.querySelector('#task-list');
console.log(taskList);

function handleTaskActions(e) {
    e.preventDefault()

    const taskItem = e.target.closest('.task');
    const taskIndex = taskItem.dataset.index;
    const task = tasks[taskIndex];

    
}

function addTask(e) {
    e.preventDefault();
    const value = taskInput.value.trim();
    if (!value) return;

    const newTask = {
        title: value,
        completed: false
    }
    tasks.unshift(newTask);

    renderTask();
    taskInput.value = '';
}

function renderTask() {
    const html = tasks.map((task, index) => `
        <li class="task ${task.completed ? 'completed' : ''}" data-index="${index}">
            <h3 class="task-title">${task.title}</h3>
            <div class="action-buttons">
                <button class="btn done">${task.completed ? 'mark as undone' : 'mark as done'}</button>
                <button class="btn edit">
                    <img src="image 2.svg" alt="edit icon">
                </button>
                <button class="btn delete">
                    <img src="image 1.svg" alt="edit icon">
                </button>
            </div>
        </li>
    `).join('');

    taskList.innerHTML = html;
}

renderTask();

taskForm.addEventListener('submit', addTask);