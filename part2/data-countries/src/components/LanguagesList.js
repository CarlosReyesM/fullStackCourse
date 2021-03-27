import React from 'react'

const LanguagesList = ({languages}) => {
  return (
    <>
      <ul>
        {languages.map(l => <li key={l.iso639_1}>{l.name}</li>)}
      </ul>
    </>
  )
}

export default LanguagesList
