# Task-Board



AS A project team member with multiple tasks to organize
I WANT a task board 
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly

GIVEN a task board to manage a project
WHEN I open the task board
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
WHEN I view the task board for the project
THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
WHEN I click on the button to define a new task
THEN I can enter the title, description and deadline date for the new task into a modal dialog
WHEN I click the save button for that task
THEN the properties for that task are saved in localStorage
WHEN I drag a task to a different progress column
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
WHEN I click the delete button for a task
THEN the task is removed from the task board and will not be added back after refreshing
WHEN I refresh the page
THEN the saved tasks persist 

## Credits

Used third party libraries Bootstrap, jQuery, and jQuery UI, and Day.js.


##
Was given a blank task board with three columns: to do, in progress, and done. The 'add task' button doesn't work.
Added datepicker from jQuery ui.
Added modal from bootstrap.
Modified modal to match mock-up.
Set up local storage functions to get and save information.
Added event listener to the Add Task button.
Created function to handle adding a new task.
For that function I had to declare const variables, and create a newTask object? ....
Cleared task input form after each use.
Created function to create a task card. The function creates HTML and styles it.
With an if and else if statement, it adjusts the color of the cards by due date.
Then needed to append all elements to the taskCard and return the completed card.

