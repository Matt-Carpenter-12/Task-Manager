// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    // Check if taskIdCounter exists in localStorage
    if (!localStorage.getItem('taskIdCounter')) {
        localStorage.setItem('taskIdCounter', '1'); // Initialize taskIdCounter if it doesn't exist
    }
    
    // Retrieve the current taskIdCounter value from localStorage
    let taskId = parseInt(localStorage.getItem('taskIdCounter'));
    
    // Increment taskIdCounter for the next task
    localStorage.setItem('taskIdCounter', String(taskId + 1));
    
    return taskId;
}


// Todo: create a function to create a task card
function createTaskCard(task) {
 // Create a <div> element for the task card
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.setAttribute('data-task-id', task.id); // Set data-task-id attribute with task ID

    // Create inner HTML for the task card
    taskCard.innerHTML = `
        <h3 class="task-title">${task.title}</h3>
        <p class="task-desc">${task.description}</p>
        <p class="task-date">Due Date: ${task.dueDate}</p>
    `;

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // Retrieve tasks from localStorage or initialize if empty
    let tasks = JSON.parse(localStorage.getItem('tasks')) || { todo: [], inProgress: [], done: [] };

    // Function to render tasks in each lane
    renderTaskLane(tasks.todo, '#todo-cards');
    renderTaskLane(tasks.inProgress, '#in-progress-cards');
    renderTaskLane(tasks.done, '#done-cards');

    // Enable drag-and-drop functionality using jQuery UI Sortable
    $('.lane .card-body').sortable({
        connectWith: '.lane .card-body',
        update: function(event, ui) {
            const taskIndex = ui.item.index(); // Index of dragged task
            const currentLaneId = ui.item.closest('.lane').attr('id'); // ID of current lane

            // Determine destination lane based on current lane ID
            let destinationLane;
            switch (currentLaneId) {
                case 'to-do':
                    destinationLane = 'todo';
                    break;
                case 'in-progress':
                    destinationLane = 'inProgress';
                    break;
                case 'done':
                    destinationLane = 'done';
                    break;
                default:
                    destinationLane = 'todo'; // Default to 'To Do' if not recognized
            }

            // Retrieve task data from tasks object
            const task = tasks[currentLaneId][taskIndex];

            // Remove task from current lane and add to destination lane
            tasks[currentLaneId].splice(taskIndex, 1); // Remove from current lane
            tasks[destinationLane].push(task); // Add to new lane

            // Update tasks in localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    });
}

// Function to render tasks in a specific lane
function renderTaskLane(tasksArray, containerId) {
    const taskContainer = $(containerId);
    taskContainer.empty(); // Clear existing tasks

    // Iterate through tasks array and create task cards
    tasksArray.forEach(function(task) {
        const taskCard = createTaskCard(task);
        taskContainer.append(taskCard);
    });
}

// Function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div class="task-card"></div>');
    taskCard.attr('data-task-id', task.id); // Set data attribute for task ID
    taskCard.html(`
        <h3 class="task-title">${task.title}</h3>
        <p class="task-desc">${task.description}</p>
        <p class="task-date">Due Date: ${task.dueDate}</p>
    `);
    return taskCard;
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
