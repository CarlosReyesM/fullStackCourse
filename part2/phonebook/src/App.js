import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Header from './components/Header';
import Form from './components/Form';
import PersonsList from './components/PersonsList';
import backend from './backend/backend';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const getPersons = () => {
    backend.getPersons().then((data) => {
      setPersons([...data]);
    });
  };

  useEffect(getPersons, []);

  useEffect(() => {
    setFilteredPersons(persons);
  }, [persons]);

  const resetForm = () => {
    setNewName('');
    setNewNumber('');
  };

  const resetPersons = (newPersons) => {
    setPersons(newPersons);
    setFilteredPersons(newPersons);
  };

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
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old phone number?`,
        )
      ) {
        const changePerson = persons.find(
          (p) => p.name.toLowerCase() === newName.toLowerCase(),
        );
        Object.assign(changePerson, { number: newNumber });
        return backend.replaceNumber(changePerson).then((res) => {
          const newPersons = persons.map((p) => (p.id !== res.id ? p : res));
          resetPersons(newPersons);
          resetForm();
        });
      }
      return;
    }
    if (!newName.length || !newNumber.length) {
      return alert('You need to add a name and number');
    }
    backend.setPerson({ name: newName, number: newNumber }).then((person) => {
      const newPersons = persons.concat(person);
      resetPersons(newPersons);
    });
    resetForm();
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      backend.deletePerson(id).then(() => {
        const newPersons = persons.filter((p) => p.id !== id);
        resetPersons(newPersons);
      });
    }
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
      <PersonsList persons={filteredPersons} handleDelete={deletePerson} />
    </>
  );
};

export default App;
