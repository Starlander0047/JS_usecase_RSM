function getCachedTasks()
{
    const cachedTasks = sessionStorage.getItem('tasks');
    if (cachedTasks)
        {
            return JSON.parse(cachedTasks);
    }
    return [];
}
function getCachedTaskID()
{
    const cachedTaskID = sessionStorage.getItem('taskID');
    if (cachedTaskID)
    {
        return parseInt(cachedTaskID);
    }
    return 0;
}
function cacheTasks(tasks)
{
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
}
function cacheTaskID(taskID)
{
    sessionStorage.setItem('taskID', taskID);
}

export { getCachedTasks, getCachedTaskID, cacheTasks, cacheTaskID };