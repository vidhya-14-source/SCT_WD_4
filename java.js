document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('task-input');
    const taskDate = document.getElementById('task-date');
    const taskList = document.getElementById('task-list');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        addTask(taskInput.value, taskDate.value);
        taskInput.value = '';
        taskDate.value = '';
    });

    function addTask(task, date) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task');

        const taskContent = document.createElement('span');
        taskContent.textContent = `${task} (Due: ${new Date(date).toLocaleString()})`;
        taskItem.appendChild(taskContent);

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('complete');
        completeButton.addEventListener('click', () => {
            taskItem.classList.toggle('complete');
        });
        taskItem.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        editButton.addEventListener('click', () => {
            editTask(taskItem, taskContent);
        });
        taskItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    }

    function editTask(taskItem, taskContent) {
        const newTask = prompt('Edit Task:', taskContent.textContent.split(' (Due:')[0]);
        if (newTask) {
            const newDate = prompt('Edit Due Date (YYYY-MM-DDTHH:MM):', taskItem.querySelector('span').textContent.split('Due: ')[1].slice(0, -1));
            if (newDate) {
                taskContent.textContent = `${newTask} (Due: ${new Date(newDate).toLocaleString()})`;
            }
        }
    }
});
