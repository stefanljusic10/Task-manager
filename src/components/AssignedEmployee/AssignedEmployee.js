import React from 'react'
import './assignedEmployee.scss'
import removeAssignedEmployeeIcon from '../../assets/remove-assigned-employee.svg'

const AssignedEmployee = ({ name, clickHandler }) => {
  return (
    <li className='assignedEmployee__person'>
        {name}
        <img onClick={clickHandler} src={removeAssignedEmployeeIcon}  alt="remove" />
    </li>
  )
}

export default AssignedEmployee