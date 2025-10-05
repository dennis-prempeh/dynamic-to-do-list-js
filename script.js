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

        // Create a new list item (li) and set its textContent to the task text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        // ✅ Use classList.add instead of className assignment
        removeBtn.classList.add('remove-btn');

        // Assign an onclick event to remove the li from the taskList when clicked
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append the remove button to the li, then append the li to the taskList
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Add event listener to the "Add Task" button that calls addTask on click
    addButton.addEventListener('click', addTask);

    // Add event listener to the task input so pressing Enter (keypress) calls addTask
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Invoke addTask on DOMContentLoaded if necessary
    // (Usually kept empty to avoid triggering alert)
});
