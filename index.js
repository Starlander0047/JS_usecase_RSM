import { getCachedTasks, getCachedTaskID, cacheTasks, cacheTaskID } from './functions/cachingFuncs.js';
import { deleteTask, editTask, assignTask, taskStatusUpdate } from './functions/operations.js';
import {dropdown} from './functions/values.js';

const tasks = getCachedTasks();
let taskID = getCachedTaskID();           
renderTasks();

function addTask()
{
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();
        if (taskValue === '')
        {
            throw new Error('Task cannot be empty');
        }
        taskID++;
        const task = {
            id: taskID,
            value: taskValue,
            status: dropdown.taskStatusList.list[0], // Default to 'Select'
            assignedTo: []
        };
        tasks.push(task);
        taskInput.value = '';
        
        cacheAndRenderTasks();
}

function cacheAndRenderTasks()
{
    cacheTasks(tasks);
    cacheTaskID(taskID);
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
        deleteButton.addEventListener('click', (event) => { deleteTask (event, tasks, cacheAndRenderTasks); });

        // Edit Button
        const editButton = document.createElement('button');
        editButton.className = 'editButton';
        editButton.textContent = 'Edit Task';
        editButton.addEventListener('click', (event) => {editTask(event, tasks, cacheAndRenderTasks); });

        // Task Assign Input
        const taskAssignDiv = document.createElement('div');
        taskAssignDiv.className = 'taskAssignDiv';

        const label = document.createElement('label');
        label.textContent = 'Assign To: ';
        label.className = 'taskAssignLabel';
        taskAssignDiv.appendChild(label);

        const taskAssign = document.createElement('select');
        taskAssign.id = 'taskAssignSelect';
        taskAssign.className = 'taskAssignSelect';
        
        const options = dropdown.assignToList;
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
        taskAssignBTN.addEventListener('click', (event) => { assignTask(event, tasks, cacheAndRenderTasks); });

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
        const statusOptions = dropdown.taskStatusList.list;
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
        taskStatusBTN.addEventListener('click', (event) => { taskStatusUpdate(event, tasks, cacheAndRenderTasks); });
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
        // Set color based on task status
        const statusIndex = dropdown.taskStatusList.list.indexOf(task.status);
        if(dropdown.taskStatusList.list.length !== dropdown.taskStatusList.color.length)
        {
            alert("***Please provide sufficient colors in the values.js file !")
            displayStatus.style.color = "black";
        }
        else displayStatus.style.color = dropdown.taskStatusList.color[statusIndex];


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

export { addTask }; // Export functions for use in index.html