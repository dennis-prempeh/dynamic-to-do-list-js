// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task to the list
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // If input is empty, alert the user and stop
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new list item (li)
        const li = document.createElement('li');

        // Create a span to hold the task text (keeps text separate from the button)
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        li.appendChild(textSpan);

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Add functionality to remove the task when button is clicked
        removeBtn.addEventListener('click', function () {
            // Remove the li from the taskList
            taskList.removeChild(li);
        });

        // Append the remove button to the list item, then append the li to the task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field and refocus it
        taskInput.value = '';
        taskInput.focus();
    }

    // Add event listener to the "Add Task" button (click)
    addButton.addEventListener('click', addTask);

    // Allow adding task with the Enter key (keypress)
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Invoke addTask on DOMContentLoaded if there's already text in the input
    // (this honors the "invoke on DOMContentLoaded" instruction without triggering an alert on empty input)
    if (taskInput.value.trim() !== '') {
        addTask();
    }
});
