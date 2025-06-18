const tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];

const taskInput = document.querySelector('input');
const taskForm = document.querySelector('form');
const submitButton = document.querySelector('#submit');
const taskList = document.querySelector('#task-list');

function escapeHTML(html) {
    const div = document.createElement('div');
    div.innerText = html
    return div.innerHTML;
}

function saveTask() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function isDuplicateTask(newTitle, excludedIndex = -1) {
    const isDuplicate = tasks.some((task, index) => 
        task.title.toLowerCase() === newTitle.toLowerCase()
        && excludedIndex !== index
    );
    return isDuplicate;
}

function handleTaskActions(e) {
    e.preventDefault()

    const taskItem = e.target.closest('.task');
    const taskIndex = +taskItem.dataset.index;
    const task = tasks[taskIndex];

    if (e.target.closest('.edit')) {
        const newValue = prompt("Let's enter new task name <3", task.title);
        if (isDuplicateTask(newValue, taskIndex)) return alert('This task has been add before ~.~');

        if (newValue !== null && newValue.trim()) {
            task.title = newValue;
            renderTask();
            saveTask();
        }
    } else if (e.target.closest('.done')) {
        task.completed = !task.completed;
        renderTask();
        saveTask();
    } else if (e.target.closest('.delete')) {
        if (confirm('bbi are u sure want to delete this task? >:c')) {
            tasks.splice(taskIndex, 1);
            renderTask();
            saveTask();
        }
    }
}

function addTask(e) {
    e.preventDefault();
    const value = taskInput.value.trim();
    if (!value) return;
    if (isDuplicateTask(value)) {
        alert('This task has been add before ~.~');
        taskInput.value = '';
        return;
    } 
    

    const newTask = {
        title: value,
        completed: false
    }
    tasks.push(newTask);

    renderTask();
    saveTask();
    taskInput.value = '';
}

function renderTask() {
    if (tasks.length === 0) {
        taskList.innerHTML = `<li class="no-task">no task available</li>`
        return;
    }

    const html = tasks.map((task, index) => `
        <li class="task ${task.completed ? 'completed' : ''}" data-index="${index}">
            <h3 class="task-title">${escapeHTML(task.title)}</h3>
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
taskList.addEventListener('click', handleTaskActions);