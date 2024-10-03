document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-btn');
    const todoInput = document.getElementById('todo-input');
    const todoTableBody = document.getElementById('todo-table-body');
    const errorMessage = document.createElement('p');
    errorMessage.className = 'text-red-500 mt-2';
    todoInput.after(errorMessage);
    let editTaskElement = null;
    let taskCount = 0;

    // Load tasks from localStorage on page load
    loadTasks();

    // Add or update task
    addButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        
        // Show error message if input is empty
        if (taskText === '') {
            errorMessage.textContent = ' Enter a text.';
            return;
        } else {
            errorMessage.textContent = ''; // Clear error message if input is valid
        }

        if (editTaskElement) {
            // Update task if in edit mode
            editTaskElement.querySelector('.task-name').textContent = taskText;
            updateLocalStorage(); // Update localStorage after editing
            addButton.textContent = 'Add'; // Change back to "Add"
            editTaskElement = null;
            todoInput.value = '';
            
        } else {
            // Add new task
            taskCount++;

            const row = document.createElement('tr');
            row.className = 'todo-item bg-gray-50 hover:bg-gray-100';

            // Task Number (No.)
            const taskNo = document.createElement('td');
            taskNo.className = 'p-3';
            taskNo.textContent = taskCount;

            // Task Name
            const taskName = document.createElement('td');
            taskName.className = 'task-name p-3';
            taskName.textContent = taskText;

            // Actions (Edit/Delete)
            const taskActions = document.createElement('td');
            taskActions.className = 'p-3 flex space-x-3';

            // Edit button (icon)
            const editButton = document.createElement('button');
            editButton.className = 'edit-btn text-blue-500 hover:text-blue-700';
            editButton.innerHTML = '<i class="fas fa-edit"></i>';

            // Delete button (icon)
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn text-red-500 hover:text-red-700';
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

            // Append buttons
            taskActions.appendChild(editButton);
            taskActions.appendChild(deleteButton);

            // Append all cells to the row
            row.appendChild(taskNo);
            row.appendChild(taskName);
            row.appendChild(taskActions);

            // Add row to the table body
            todoTableBody.appendChild(row);

            // Clear input
            todoInput.value = '';

            // Edit task functionality
            editButton.addEventListener('click', () => {
                todoInput.value = taskName.textContent;
                addButton.textContent = 'Update'; // Change "Add" to "Update"
                editTaskElement = row; // Store reference to editing task
            });

            // Delete task functionality
            deleteButton.addEventListener('click', () => {
                todoTableBody.removeChild(row);
                // Decrement the task count and update task numbers
                taskCount--;
                updateTaskNumbers();
                updateLocalStorage(); // Update localStorage after deleting
            });

            updateLocalStorage(); // Store tasks in localStorage
        }
    });

    // Function to update task numbers
    function updateTaskNumbers() {
        const rows = todoTableBody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.querySelector('td').textContent = index + 1;
        });
    }

    // Function to save tasks to localStorage
    function updateLocalStorage() {
        const tasks = [];
        const rows = todoTableBody.querySelectorAll('tr');
        rows.forEach((row) => {
            const taskName = row.querySelector('.task-name').textContent;
            tasks.push(taskName);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Store tasks as a JSON string
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            storedTasks.forEach((task) => {
                taskCount++;

                const row = document.createElement('tr');
                row.className = 'todo-item bg-gray-50 hover:bg-gray-100';

                // Task Number (No.)
                const taskNo = document.createElement('td');
                taskNo.className = 'p-3';
                taskNo.textContent = taskCount;

                // Task Name
                const taskName = document.createElement('td');
                taskName.className = 'task-name p-3';
                taskName.textContent = task;

                // Actions (Edit/Delete)
                const taskActions = document.createElement('td');
                taskActions.className = 'p-3 flex space-x-3';

                // Edit button (icon)
                const editButton = document.createElement('button');
                editButton.className = 'edit-btn text-blue-500 hover:text-blue-700';
                editButton.innerHTML = '<i class="fas fa-edit"></i>';

                // Delete button (icon)
                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-btn text-red-500 hover:text-red-700';
                deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

                // Append buttons
                taskActions.appendChild(editButton);
                taskActions.appendChild(deleteButton);

                // Append all cells to the row
                row.appendChild(taskNo);
                row.appendChild(taskName);
                row.appendChild(taskActions);

                // Add row to the table body
                todoTableBody.appendChild(row);

                // Edit task functionality
                editButton.addEventListener('click', () => {
                    todoInput.value = taskName.textContent;
                    addButton.textContent = 'Update'; // Change "Add" to "Update"
                    editTaskElement = row; // Store reference to editing task
                });

                // Delete task functionality
                deleteButton.addEventListener('click', () => {
                    todoTableBody.removeChild(row);
                    taskCount--;
                    updateTaskNumbers();
                    updateLocalStorage(); // Update localStorage after deleting
                });
            });
        }
    }
});


