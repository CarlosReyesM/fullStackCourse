import React, { useState } from 'react';
import Filter from './components/Filter';
import Header from './components/Header';
import Form from './components/Form';
import PersonsList from './components/PersonsList';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const handleNameChange = (e) => {
    const theNewName = e.target.value;
    setNewName(theNewName);
  };

  const handleNumberChange = (e) => {
    const theNewNumber = e.target.value;
    setNewNumber(theNewNumber);
  };

  const handleFilterChange = (e) => {
    const newSearch = e.target.value;
    setSearchValue(newSearch);
    const filterPersons = persons.filter((p) =>
      p.name.toLowerCase().includes(newSearch.toLowerCase()),
    );
    setFilteredPersons(filterPersons);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((p) => p.name.toLowerCase() === newName.toLowerCase())) {
      return alert(`${newName} is already added to phonebook`);
    }
    if (!newName.length || !newNumber.length) {
      return alert('You need to add a name and number');
    }
    const newPersons = persons.concat({ name: newName, number: newNumber });
    setPersons(newPersons);
    setFilteredPersons(newPersons);
    setNewName('');
    setNewNumber('');
  };

  return (
    <>
      <Header h={2} text='Phonebook' />
      <Filter handleChange={handleFilterChange} value={searchValue} />
      <Header h={3} text='Add a New' />
      <Form
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <Header h={3} text='Numbers' />
      <PersonsList persons={filteredPersons} />
    </>
  );
};

export default App;
