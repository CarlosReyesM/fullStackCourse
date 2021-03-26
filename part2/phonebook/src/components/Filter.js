import React from 'react'

const Filter = ({handleChange, value}) => {
  return (
    <div>
    filter show with{' '}
    <input type='text' onChange={handleChange} value={value} />
  </div>
  )
}

export default Filter
