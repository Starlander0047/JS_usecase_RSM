const tasks = getCachedTasks();
taskID = getCachedTaskID();
renderTasks();

function getCachedTasks()
{
    const cachedTasks = sessionStorage.getItem('tasks');
    if (cachedTasks) {
        return JSON.parse(cachedTasks);
    }
    return [];
}
function getCachedTaskID()
{
    const cachedTaskID = sessionStorage.getItem('taskID');
    if (cachedTaskID) {
        return parseInt(cachedTaskID);
    }
    return 0;
}
function cacheTasks()
{
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
}
function cacheTaskID()
{
    sessionStorage.setItem('taskID', taskID);
}

function addTask()
{
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();
    if (taskValue === '') {
        alert('Please enter a task');
        return;
    }
    taskID++;
    const task = {
        id: taskID,
        value: taskValue,
        status: "*New",
        assignedTo: []
    };
    tasks.push(task);
    taskInput.value = '';
    cacheTasks();
    cacheTaskID();
    renderTasks();
}

function renderTasks() {
    const tasksDiv = document.getElementById('tasksDiv');
    tasksDiv.innerHTML = ''; // Clear previous tasks

    tasks.forEach(task => {

        // Create task div
        const taskDiv = document.createElement('div');
        const taskLabel = document.createElement('label');
        taskLabel.textContent = 'Task: ';
        taskLabel.className = 'taskLabel';
        taskDiv.appendChild(taskLabel);

        taskDiv.id = task.id;
        taskDiv.className = 'task';

        // Create task li element
        const li = document.createElement('li');
        li.className = 'taskValue';
        li.textContent = `${task.value}`;
        taskDiv.appendChild(li);


        // Create operations div
        const operationsDiv = document.createElement('div');
        operationsDiv.className = 'operations';

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Task';
        deleteButton.className = 'deleteButton';

        // Edit Button
        const editButton = document.createElement('button');
        editButton.className = 'editButton';
        editButton.textContent = 'Edit Task';

        // Task Assign Input
        const taskAssignDiv = document.createElement('div');
        taskAssignDiv.className = 'taskAssignDiv';

        label = document.createElement('label');
        label.textContent = 'Assign To: ';
        label.className = 'taskAssignLabel';
        taskAssignDiv.appendChild(label);

        const taskAssign = document.createElement('select');
        taskAssign.id = 'taskAssignSelect';
        taskAssign.className = 'taskAssignSelect';
        
        const options = ['Select', 'Asad', 'Umar', 'Peter', 'Nitin', 'Piyush', 'Shahid', 'Upendra', 'Rishabh'];
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            if(opt.value === 'Select') {
                opt.selected = true;
                opt.disabled = true;
            }
            taskAssign.appendChild(opt);
        });
        const taskAssignBTN = document.createElement('button');
        taskAssignBTN.textContent = 'Assign Task';
        taskAssignBTN.className = 'taskAssignBTN';

        taskAssignDiv.appendChild(taskAssign);
        taskAssignDiv.appendChild(taskAssignBTN);
        

        // Task Status Input
        const statusDiv = document.createElement('div');
        statusDiv.className = 'taskStatusDiv';

        const taskStatusLabel = document.createElement('label');
        taskStatusLabel.textContent = 'Status: ';
        taskStatusLabel.className = 'taskStatusLabel';
        statusDiv.appendChild(taskStatusLabel);

        const taskStatus = document.createElement('select');
        taskStatus.id = 'taskStatusSelect';
        taskStatus.className = 'taskStatusSelect';
        const statusOptions = ['Select', 'Todo', 'In-progress', 'Done'];
        statusOptions.forEach(status => {
            const statusOpt = document.createElement('option');
            statusOpt.value = status
            statusOpt.textContent = status;
            if(statusOpt.value === 'Select') {
                statusOpt.selected = true;
                statusOpt.disabled = true;
            }
            taskStatus.appendChild(statusOpt);
        });
        statusDiv.appendChild(taskStatus);

        const taskStatusBTN = document.createElement('button');
        taskStatusBTN.textContent = 'Update Status';
        taskStatusBTN.className = 'taskStatusBTN';
        statusDiv.appendChild(taskStatusBTN);


        // Append all elements to the taskDiv
        operationsDiv.appendChild(deleteButton);
        operationsDiv.appendChild(editButton);
        operationsDiv.appendChild(taskAssignDiv);
        operationsDiv.appendChild(statusDiv);

        taskDiv.appendChild(operationsDiv);

        // Display 'task assigned users' and 'task status'
        const displayOverview = document.createElement('div');
        displayOverview.className = 'displayOverview';
        const displayAssigned = document.createElement('h2');
        displayAssigned.className = 'displayAssigned';
        displayAssigned.textContent = `Assigned To: ${task.assignedTo.length > 0 ? task.assignedTo.join(', ') : 'None'}`;
        displayOverview.appendChild(displayAssigned);
        const displayStatus = document.createElement('h2');
        displayStatus.className = 'displayStatus';
        displayStatus.textContent = `Status: ${task.status}`;
        displayOverview.appendChild(displayStatus);

        taskDiv.appendChild(displayOverview);

        // Append taskDiv to tasksDiv
        tasksDiv.appendChild(taskDiv);

    });

    if(tasksDiv.children.length === 0) {
        const noTaskMSG = document.createElement('h3');
        noTaskMSG.className = 'noTaskMSG';
        noTaskMSG.innerHTML = '*No Tasks Available!';
        noTaskMSG.style.color = 'red';
        tasksDiv.appendChild(noTaskMSG);
    }
}

// Add event listener to tasksDiv
const tasksDiv = document.getElementById('tasksDiv');
tasksDiv.addEventListener('click', function(event) {
    if(event.target && event.target.matches('.deleteButton'))
    {
        const taskDiv = event.target.closest('.task');
        const taskId = parseInt(taskDiv.id);
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex > -1)
        {
            tasks.splice(taskIndex, 1);
            renderTasks();
        }
    }
    else if(event.target && event.target.matches('.taskAssignBTN'))
    {
        const taskDiv = event.target.closest('.task');
        const taskID = parseInt(taskDiv.id);
        const taskIndex = tasks.findIndex(task => task.id === taskID);
        const taskAssignSelect = taskDiv.querySelector('#taskAssignSelect');
        const assignedTo = taskAssignSelect.value;
        if (taskIndex > -1 && assignedTo !== 'Select' && tasks[taskIndex].assignedTo.includes(assignedTo) === false)
        {
            tasks[taskIndex].assignedTo.push(assignedTo);
            alert(`Task assigned to ${assignedTo}`);
            renderTasks();
        }
        else alert('Please select a valid user to assign the task');
    }
    else if(event.target && event.target.matches('.taskStatusBTN'))
    {
        const taskDiv = event.target.closest('.task');
        const taskID = parseInt(taskDiv.id);
        const taskIndex = tasks.findIndex(task => task.id === taskID);
        const taskStatusSelect = taskDiv.querySelector('#taskStatusSelect');
        const status = taskStatusSelect.value;
        if (taskIndex > -1 && status !== 'Select')
        {
            tasks[taskIndex].status = status;
            alert(`Task status updated to ${status}`);
            renderTasks();
        }
        else alert('Please select a valid status');
    }
    else if(event.target && event.target.matches('.editButton'))
    {
        const taskDiv = event.target.closest('.task');
        const taskID = parseInt(taskDiv.id);
        const taskIndex = tasks.findIndex(task => task.id === taskID);
        const taskValue = prompt('Edit Task:', tasks[taskIndex].value);
        if (taskIndex > -1 && taskValue !== null && taskValue.trim() !== '')
        {
            tasks[taskIndex].value = taskValue.trim();
            renderTasks();
        }
        else if (taskValue === null)
        {
            alert('**Edit CANCELLED');
        }
        else if(taskValue.trim() === '')
        {
            alert('**Task cannot be EMPTY');
        }
    }
    cacheTasks();
    cacheTaskID();
});