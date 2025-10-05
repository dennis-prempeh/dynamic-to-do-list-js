// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {

    // Step 1: Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 2: Define the addTask function
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // If input is empty, alert the user
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Add functionality to remove the task when button is clicked
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append the remove button to the list item
        li.appendChild(removeBtn);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Step 3: Add event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Step 4: Allow adding task with the Enter key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Step 5: Invoke addTask on DOMContentLoaded (optional as per instruction)
    // Note: This won’t add a task automatically, but ensures the function is ready
    addTask;
});
