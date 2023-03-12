import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, selectTasks } from '../../redux/slices/tasksSlice'
import './tasks.scss'
import deleteIcon from '../../assets/delete-icon.svg'
import updateIcon from '../../assets/update-icon.svg'
import { useNavigate } from 'react-router-dom'
import openModal from '../../utils/openModal'
import Button from '../../components/Button/Button'
import SearchBar from '../../components/SearchBar/SearchBar'

const Tasks = () => {
  const [searchTask, setSearchTask] = useState('')
  const navigate = useNavigate()
  const tasksList = useSelector(selectTasks)
  const dispatch = useDispatch()

  const searchTaskMatched = tasksList.filter(task => task.title.toLowerCase().includes(searchTask.toLowerCase()))

  const goToSelectedTask = (task) => {
    navigate(`/task/form/id=${task.id}`)
    localStorage.setItem('selectedTask', JSON.stringify(task))
  }

  const renderTasks = searchTaskMatched.map(task => {
    return(
      <div 
        className='tasks__items' 
        key={task.id}
        onClick={(e) => openModal(e, dispatch, task)}
      >
        {task.title}
        <div>
          <img onClick={() => goToSelectedTask(task)} src={updateIcon} alt="edit"/>
          <img onClick={() => dispatch(deleteTask('task', task.id))} src={deleteIcon} alt="remove"/>
        </div>
      </div>
    )
  })
  
  return (
    <div className='tasks'>
      <h2 className='margin-bottom-small'>Tasks</h2>
      <Button 
        value="Create new task" 
        btnClass="btnGreen margin-bottom-medium" 
        clickHandler={() => navigate('/task/form')} 
      />
      <SearchBar 
        placeholder="search by title"
        changeHandler={setSearchTask}
      />
      <div className='tasks__list'>
        {renderTasks}
      </div>
    </div>
  )
}

export default Tasks