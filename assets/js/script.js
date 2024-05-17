



const toDoColumn = $("#todo-cards");
const inProgressColumn = $("#in-progress-cards");
const doneColumn = $("#done-cards");

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
function createTaskCard(newTask) {
    const taskList = readFromStorage();
    

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
    //empty columns to avoid duplicates being rendered on handleAddTask
    toDoColumn.empty();
    inProgressColumn.empty();
    doneColumn.empty();
    const taskList = readFromStorage();


    //Appends to proper column based on task status
    for (let task of taskList) {
        if (task.status === 'to-do') {
            toDoColumn.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
            inProgressColumn.append(createTaskCard(task));
        } else if (task.status === 'done') {
            doneColumn.append(createTaskCard(task));
        }
    }

    //Makes cards draggable
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function (e) {
          const original = $(e.target).hasClass('ui-draggable')
            ? $(e.target)
            : $(e.target).closest('.ui-draggable');
          return original.clone().css({
            width: original.outerWidth(),
          });
        },
      });

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

    // pushes to taskList array
    taskList.push(newTask);
    saveToStorage(taskList);
    renderTaskList(newTask);


    //  clear task input form after each use
    taskTitle.val('');
    taskDueDate.val('');
    taskDescription.val('');
    
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const taskList = readFromStorage();
    const deleteButton = $(event.target);

    const targetId = deleteButton.data('data-task-id');
    const targetIndex = taskList.findIndex(task => task.id === targetId);

    if (targetIndex > -1) {
        taskList.splice(targetIndex, 1);
    }

    deleteButton.parent().parent('div').remove();
    saveToStorage(taskList);

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskList = readFromStorage();


    const targetId = ui.draggable.data('data-task-id');

    for (i = 0; i < taskList.length; i++) {
        const task = taskList[i];
        const updateStatus = event.target.id;

        if (targetId === task.id) {
            task.status = updateStatus;
        }
    }


    saveToStorage(taskList);
    renderTaskList();

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // reads local storage
    const taskList = readFromStorage();

    // renders task list
    renderTaskList();

    // event listener to add tasks
    $("#taskbtn").on("click", handleAddTask);

    // event listener to delete tasks
    $(".swim-lanes").on("click", ".btn-danger", handleDeleteTask);


// datepicker
    $(function() {
        $("#task-due-date").datepicker({
            changeMonth: true,
            changeYear: true
          });
      });

// makes lanes open to draggable cards
    $( ".droppable" ).droppable({
        accept: '.draggable',
         drop: handleDrop, 
          });

});
