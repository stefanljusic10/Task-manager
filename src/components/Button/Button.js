import React from 'react'
import './button.scss'

const Button = ({ value, btnClass, clickHandler }) => {
  return (
    <button
      className={`${'button ' + btnClass}`}
      onClick={() => clickHandler()}
    >
      {value}
    </button>
  )
}

export default Button