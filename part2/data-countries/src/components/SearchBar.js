import React from 'react'

const SearchBar = ({handleChange, value}) => {
  return (
    <div>
      Find Countries <input type="text" onChange={handleChange} value={value} />
    </div>
  )
}

export default SearchBar
