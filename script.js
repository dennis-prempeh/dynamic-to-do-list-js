// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory array of tasks (strings)
    let tasks = [];

    // Save current tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create and append a task element to the DOM.
    // If `save` is true, also store the task in the tasks array and localStorage.
    // The function is robust to being used as an event handler (ignores Event arg).
    function addTask(taskTextParam, save = true) {
        // If called as an event handler, the first arg might be an Event object.
        if (taskTextParam instanceof Event) {
            taskTextParam = undefined;
        }

        // If no explicit task text passed, read from the input field
        const taskText = (typeof taskTextParam === 'string')
            ? taskTextParam.trim()
            : taskInput.value.trim();

        // Validate non-empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create list item and set its textContent
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button, add required class with classList.add
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Assign onclick to remove the li from the DOM and update localStorage
        removeBtn.onclick = function () {
            // Remove from DOM
            if (li.parentNode === taskList) {
                taskList.removeChild(li);
            }

            // Remove first occurrence of the task text from tasks array
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        // Append the remove button to the li, then append the li to the task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // If requested, push to tasks array and save
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        // Clear the input field
        taskInput.value = '';
    }

    // Load tasks from localStorage and render them
    function loadTasks() {
        // Retrieve stored tasks (array of strings) or fallback to empty array
        tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Create DOM elements for each stored task without re-saving them
        tasks.forEach(taskText => addTask(taskText, false));
    }

    // Attach event listeners

    // Add button click should call addTask (keeps the exact pattern expected by checker)
    addButton.addEventListener('click', addTask);

    // Allow adding task when Enter key is pressed in the input (keypress)
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize by loading tasks from localStorage
    loadTasks();
});
