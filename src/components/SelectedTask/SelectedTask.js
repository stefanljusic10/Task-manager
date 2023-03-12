import React from 'react'
import { useSelector } from 'react-redux'
import { selectSelectedTask } from '../../redux/slices/tasksSlice'
import './selectedTask.scss'
import moment from 'moment'
import { selectEmployees } from '../../redux/slices/employeesSlice'

const SelectedTask = () => {
    const selectedTask = useSelector(selectSelectedTask)
    const employeesList = useSelector(selectEmployees)

    const taskDueDate = moment(selectedTask.dueDate).format("DD/MM/YYYY")
    const taskAssignees = selectedTask.assignee.map(assignedID => {
        const assignedEmployee = employeesList.find(emp => emp.id == assignedID)
        if(assignedEmployee)
            return <li key={assignedEmployee.id}>{assignedEmployee.name}</li>
    })

  return (
    <div className='selectedTask'>
        <h2 className='margin-bottom-small'>Selected task</h2>
        <div className='selectedTask__info'>
            <div className='selectedTask__item'>
                <h3>Title:</h3>
                <p>{selectedTask.title}</p>
            </div>
            <div className='selectedTask__item'>
                <h3>Description:</h3>
                <p>{selectedTask.description}</p>
            </div>
            <div className='selectedTask__item'>
                <h3>Due Date:</h3>
                <p>{taskDueDate}</p>
            </div>
            <div className='selectedTask__item'>
                <h3>Assigned to:</h3>
                <ul>
                    {taskAssignees}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default SelectedTask