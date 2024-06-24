// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Function to generate a unique task ID
function generateTaskId() {
    const id = nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return id;
}

// Function to create a task card
function createTaskCard(task) {
    return `
        <div class="task-card card mb-2" id="task-${task.id}" data-id="${task.id}">
            <div class="card-body">
                <h5 class="card-title">${task.title}</h5>
                <p class="card-text">${task.description}</p>
                <p class="card-text"><small>Due: ${task.dueDate}</small></p>
                <button class="btn btn-danger delete-task">Delete</button>
            </div>
        </div>
    `;
}

// Function to render the task list and make cards draggable
function renderTaskList() {
    console.log('Rendering task list');
    console.log(taskList);

    $(".lane").find(".card-body").empty();
    taskList.forEach(task => {
        console.log('Appending task', task);
        $(`#${task.status}-cards`).append(createTaskCard(task));
    });

    // Make task cards draggable
    $(".task-card").draggable({
        revert: "invalid",
        start: function(event, ui) {
            $(this).addClass("dragging");
        },
        stop: function(event, ui) {
            $(this).removeClass("dragging");
        }
    });
}

// Function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    const title = $("#taskTitle").val().trim();
    const description = $("#taskDescription").val().trim();
    const dueDate = $("#taskDueDate").val();
    if (!title || !description || !dueDate) {
        alert("Please complete all fields.");
        return;
    }

    const newTask = {
        id: generateTaskId(),
        title,
        description,
        dueDate,
        status: "to-do"
    };

    console.log('Adding new task', newTask);

    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    renderTaskList();
    $("#formModal").modal("hide");
    $("#taskForm")[0].reset();
}

// Function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(event.target).closest(".task-card").data("id");
    console.log('Deleting task with id', taskId);
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.helper.data("id");
    const newStatus = $(this).attr("id").replace("-cards", "");
    console.log('Dropping task', taskId, 'into', newStatus);
    taskList.forEach(task => {
        if (task.id === taskId) {
            task.status = newStatus;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    console.log('Document ready');
    renderTaskList();

    $("#taskForm").on("submit", handleAddTask);

    $(".lane").on("click", ".delete-task", handleDeleteTask);

    $(".lane .card-body").droppable({
        accept: ".task-card",
        drop: handleDrop
    });

    $("#taskDueDate").datepicker();
});
