import React, { useState } from 'react'
import './dropdownEmployee.scss'
import { FILTERS } from '../../utils/filters'

const DropdownEmployee = ({ value, clickHandler }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false)

  const renderFilters = FILTERS.map(fil => {
    return (
      <div onClick={(e) => clickHandler(e.target.innerText)} key={fil}>
        {fil}
      </div>
    )
  })

  return (
    <div 
      className='dropdownEmployee'
      onClick={() => setToggleDropdown(prevToggle => !prevToggle)}
    >
        { value } &darr;
        { toggleDropdown && <div className='dropdownEmployee__container'>{renderFilters}</div> }
    </div>
  )
}

export default DropdownEmployee