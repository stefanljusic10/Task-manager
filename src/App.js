import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './app.scss'
import Header from './components/Header/Header'
import Employees from './pages/Employees/Employees'
import Tasks from './pages/Tasks/Tasks'
import Modal from './components/Modal/Modal'
import ApiData from './api/ApiData'
import { useSelector } from 'react-redux'
import { selectModal } from './redux/slices/modalSlice'
import EmployeeForm from './pages/EmployeeForm/EmployeeForm'
import TaskForm from './pages/TaskForm/TaskForm'
import Error from './pages/Error/Error'

const App = () => {
  const toggleModal = useSelector(selectModal)
  
  return (
    <BrowserRouter>
      <ApiData />
      <div className='app'>
        <Header />
        <Routes>
          <Route exact path="/" element={<Employees />}></Route>
          <Route path='/employee/form' element={<EmployeeForm />}></Route>
          <Route path='/employee/form/id=:id' element={<EmployeeForm />}></Route>
          <Route path="/tasks" element={<Tasks />}></Route>
          <Route path="/task/form" element={<TaskForm />}></Route>
          <Route path="/task/form/id=:id" element={<TaskForm />}></Route>
          <Route path="*" element={<Error text="Page not found" />}></Route>
        </Routes>
        {toggleModal && <Modal />}
      </div>
    </BrowserRouter>
  )
}

export default App