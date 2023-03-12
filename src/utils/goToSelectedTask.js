// set selected task to local storage and go to update page
export const goToSelectedTask = (task, navigate) => {
    navigate(`/task/form/id=${task.id}`)
    localStorage.setItem('selectedTask', JSON.stringify(task))
  
}