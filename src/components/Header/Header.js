import React from 'react'
import { useNavigate } from 'react-router-dom'
import './header.scss'

const Header = () => {

  const navigate = useNavigate()

  return (
    <header className='header'>
        <ul>
            <li onClick={() => navigate('/')}>Employees</li>
            <li onClick={() => navigate('/tasks')}>Tasks</li>
        </ul>
    </header>
  )
}

export default Header