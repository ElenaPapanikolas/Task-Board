

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// function to get information
function readFromStorage() {
    let taskList = JSON.parse(localStorage.getItem('tasks'));
    if (!taskList) {
        taskList = [];
    }
    return taskList;
}

// function to save information
function saveToStorage(taskList) {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}


// Todo: create a function to generate a unique task id
function generateTaskId() {
    return crypto.randomUUID();
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskList = readFromStorage();
    const nextId = readIdFromStorage();

    const taskCard = $('<div>')
        .addClass('card draggable my-3')
        .data('data-task-id', newTask.id);
    const taskHeader = $('<h5>')
        .addClass('card-header').text(newTask.title);
    const taskBody = $('<div>')
        .addClass('card-body');
    const taskDescription = $('<p>')
        .addClass('card-text').text(newTask.description);
    const taskDueDate =$('<p>')
        .addClass('card-text').text(newTask.dueDate);
    const taskDelete = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .data('data-task-id', newTask.id);
    taskDelete.on('click', handleDeleteTask);
    
    if (newTask.dueDate && newTask.status !== 'done') {
        const dueDate = dayjs(newTask.dueDate, 'MM DD, YYYY');
        const currentDate = dayjs();
        //adjusts color of card by due date
        if (currentDate.isSame(dueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (currentDate.isAfter(dueDate)) {
            taskCard.addClass('bg-danger text-white');
            taskDelete.addClass('border-light');
        }
    }

    //appends all elements to taskCard and returns completed card
    taskCard.append(taskHeader, taskBody);
    taskBody.append(taskDescription, taskDueDate, taskDelete);
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    const taskList = readFromStorage();
    const taskTitle = $("#task-title");
    const taskDueDate = $("#task-due-date");
    const taskDescription = $("#task-description");

    const newTask = {
        id: generateTaskId(),
        title: taskTitle.val(),
        dueDate: taskDueDate.val(),
        description: taskDescription.val(),
        status: 'to-do',
    }

    
    taskList.push(newTask);
    saveToStorage(taskList);
    renderTaskList(newTask);
    console.log(taskList);  // take this out eventually
    //  clear task input form after each use
    taskTitle.val('');
    taskDueDate.val('');
    taskDescription.val('');
    
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $("#taskbtn").on("click", handleAddTask);




// datepicker
    $(function() {
        $("#task-due-date").datepicker({
            changeMonth: true,
            changeYear: true
          });
      });



});
