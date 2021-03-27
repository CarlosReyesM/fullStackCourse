import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CountriesList from './components/CountriesList';
import SearchBar from './components/SearchBar';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  const fetchCountries = () =>
    axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
      setCountries(res.data);
      setFilteredCountries(res.data);
    });

  const handleFilter = (e) => {
    const {
      target: { value },
    } = e;
    setFilterValue(value);
    if (value === '') {
      return setFilteredCountries(countries);
    }
    const filterCountries = countries.filter((c) =>
      c.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredCountries(filterCountries);
  };

  const handleShow = (name) => {
    setFilterValue(name);
    const filterCountries = countries.filter((c) =>
      c.name.toLowerCase().includes(name.toLowerCase()),
    );
    setFilteredCountries(filterCountries);
  };

  useEffect(fetchCountries, []);
  return (
    <div>
      <SearchBar handleChange={handleFilter} value={filterValue} />
      <CountriesList countries={filteredCountries} handleShow={handleShow} />
    </div>
  );
};

export default App;
