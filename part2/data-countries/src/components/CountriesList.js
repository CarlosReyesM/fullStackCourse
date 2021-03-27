import React from 'react';
import CountryDetails from './CountryDetails';

const CountriesList = ({ handleShow, countries = [] }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    const [country] = countries;
    return <CountryDetails country={country} />;
  }

  return countries.map((c) => {
    const handleCountryToShow = () => handleShow(c.name);
    return (<div key={c.numericCode}>
      {c.name}
      <button onClick={handleCountryToShow}>Show</button>
    </div>)
  });
};

export default CountriesList;
