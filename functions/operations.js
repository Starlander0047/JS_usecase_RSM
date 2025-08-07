function getTaskIndex(EVENT, tasks)
{
    const taskDiv = EVENT.target.closest('.task');
    const taskId = parseInt(taskDiv.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if(taskIndex > -1) return taskIndex;
    else return -1
}

function deleteTask(EVENT, tasks, cacheAndRenderTasks)
{
    const taskIndex = getTaskIndex(EVENT, tasks);

    if (taskIndex > -1)
    {
        tasks.splice(taskIndex, 1);
        cacheAndRenderTasks();
    }
    else alert('Task not found');
}

function editTask(EVENT, tasks, cacheAndRenderTasks)
{
    const taskIndex = getTaskIndex(EVENT, tasks);

    if(taskIndex > -1)
    {
        const taskValue = prompt('Edit Task:', tasks[taskIndex].value);

        if (taskValue !== null && taskValue.trim() !== '')
        {
            tasks[taskIndex].value = taskValue.trim();
            cacheAndRenderTasks();
        }
        else alert('Task cannot be empty');
    }
    else alert('Task not found');
}

function assignTask(EVENT, tasks, cacheAndRenderTasks)
{
    const taskIndex = getTaskIndex(EVENT, tasks);

    const taskDiv = EVENT.target.closest('.task');

    const taskAssignSelect = taskDiv.querySelector('#taskAssignSelect');
    const assignedTo = taskAssignSelect.value;
    if (taskIndex > -1 && assignedTo !== 'Select' && tasks[taskIndex].assignedTo.includes(assignedTo) === false)
    {
        tasks[taskIndex].assignedTo.push(assignedTo);
        alert(`Task assigned to ${assignedTo}`);
        cacheAndRenderTasks();
    }
    else alert('Please select a valid user to assign the task');
}

function taskStatusUpdate(EVENT, tasks, cacheAndRenderTasks)
{
    const taskIndex = getTaskIndex(EVENT, tasks);
    const taskDiv = EVENT.target.closest('.task');

    const taskStatusSelect = taskDiv.querySelector('#taskStatusSelect');
    const status = taskStatusSelect.value;
    if (taskIndex > -1 && status !== 'Select')
    {
        tasks[taskIndex].status = status;
        alert(`Task status updated to ${status}`);
        cacheAndRenderTasks();
    }
    else alert('Please select a valid status');
}

export {deleteTask, editTask, assignTask, taskStatusUpdate};