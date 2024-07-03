// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
const generateTaskId = function() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

console.log(generateTaskId());


// Todo: create a function to create a task card
      function createTaskCard(taskTitle, taskDescription, taskDueDate) {
            const card = document.createElement('div');
            card.classList.add('task-card');

            const titleElement = document.createElement('h3');
            titleElement.textContent = taskTitle;

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = taskDescription;

            const dueDateElement = document.createElement('p');
            dueDateElement.textContent = `Due Date: ${taskDueDate}`;

            card.appendChild(titleElement);
            card.appendChild(descriptionElement);
            card.appendChild(dueDateElement);

            return card;
      }

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const todoCards = document.getElementById('todo-cards');
    const inProgressCards = document.getElementById('in-progress-cards');
    const doneCards = document.getElementById('done-cards');

    todoCards.innerHTML = '';
    inProgressCards.innerHTML = '';
    doneCards.innerHTML = '';

    tasks.forEach(task => {
        const card = createTaskCard(task.title, task.description, task.dueDate);
        if (task.status === 'todo') {
            todoCards.appendChild(card);
        } else if (task.status === 'inProgress') {
            inProgressCards.appendChild(card);
        } else if (task.status === 'done') {
            doneCards.appendChild(card);
        }
    });

    $('.task-card').draggable({
        revert: 'invalid',
        stack: '.task-card',
        cursor: 'move',
        containment: '.swim-lanes'
    });
}
// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    
    const form = document.getElementById('taskForm');
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskDueDate = document.getElementById('taskDueDate').value;

    // Validate if form fields have values
    if (!taskTitle || !taskDescription || !taskDueDate) {
        console.error('Please fill in all fields.');
        return;
    }

    const newTask = {
        id: generateTaskId(),
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDueDate,
        status: 'todo'
    };

    console.log('New task object:', newTask);

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    console.log('Tasks in localStorage:', tasks);

    renderTaskList();
    $('#formModal').modal('hide');
    form.reset();
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = event.target.closest('.task-card').dataset.taskId;
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.draggable[0].dataset.taskId;
    const newStatus = event.target.closest('.lane').id;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.status = newStatus;
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
function handleDrop(event, ui) {
    const taskId = ui.draggable[0].dataset.taskId;
    const newStatus = event.target.closest('.lane').id;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.status = newStatus;
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}

