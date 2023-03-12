import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEmployee, selectEmployees, sortEmployees } from '../../redux/slices/employeesSlice'
import './employees.scss'
import moment from 'moment'
import updateIcon from '../../assets/update-icon.svg'
import deleteIcon from '../../assets/delete-icon.svg'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import SearchBar from '../../components/SearchBar/SearchBar'
import DropdownEmployee from '../../components/DropdownEmployee/DropdownEmployee'
import { goToSelectedEmployee } from '../../utils/goToSelectedEmployee'
import { selectTasks } from '../../redux/slices/tasksSlice'

const Employees = () => {
  const [searchEmployee, setSearchEmployee] = useState('')
  const [filterEmployees, setFilterEmployees] = useState('filter employees')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const employeesList = useSelector(selectEmployees)
  const tasksList = useSelector(selectTasks)
  
  const searchEmployeesMatched = employeesList.filter(emp => emp?.name.toLowerCase().includes(searchEmployee.toLowerCase()))

  // sorting employees on selected filter
  useEffect(() => {
    dispatch(sortEmployees({ filterEmployees, tasksList }))
  }, [filterEmployees])
  
  const renderEmployees = searchEmployeesMatched.map(emp => {
    const empBirthday = moment(emp.dateOfBirth).format("DD/MM/YYYY")
    return(
      <div className='employees__person' key={emp.id}>
        <div>{emp.name}</div>
        <div>{emp.email}</div>
        <div>{emp.phone}</div>
        <div>{empBirthday}</div>
        <div>{emp.salary}</div>
        <div>
          <img onClick={() => goToSelectedEmployee(emp, navigate)} src={updateIcon} alt="edit" />
          <img onClick={() => dispatch(deleteEmployee('employees', emp.id, tasksList))} src={deleteIcon} alt="remove" />
        </div>
      </div>
    )
  })

  return (
    <div className='employees'>
      <h2 className='margin-bottom-small'>Employees</h2>
      <Button 
        value="Create new employee" 
        btnClass="btnGreen margin-bottom-medium" 
        clickHandler={() => navigate('/employee/form')} 
      />
      <div className='employees__nav margin-bottom-small'>
        <SearchBar placeholder="search by name" changeHandler={setSearchEmployee} />
        <DropdownEmployee value={filterEmployees} clickHandler={setFilterEmployees} />
      </div>
      <div className='employees__head'>
        <div>name</div>
        <div>email</div>
        <div>phone</div>
        <div>birthday</div>
        <div>salary</div>
        <div>update/delete</div>
      </div>
      <div className='employees__container'>
        {renderEmployees}
      </div>
    </div>
  )
}

export default Employees