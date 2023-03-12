import React from 'react'
import './searchBar.scss'

const SearchBar = ({ placeholder, changeHandler }) => {
  return (
        <input 
            className='searchBar' 
            placeholder={placeholder}
            onChange={(e) => changeHandler(e.target.value)}
        />
    )
}

export default SearchBar