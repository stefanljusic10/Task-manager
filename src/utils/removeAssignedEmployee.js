// remove employee from task
export const removeAssignedEmployee = (tasks, employeeId, setFieldValue) => {
    employeeId = Number(employeeId)
    const filtered = tasks.filter(val => val !== employeeId)
    setFieldValue('assignee', filtered)
}