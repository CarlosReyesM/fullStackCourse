import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LanguagesList from './LanguagesList';
import WeatherView from './WeatherView';

const apiKey = process.env.REACT_APP_WEATHER_KEY;

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState();

  const fetchWeather = () =>
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.name}`,
      )
      .then((res) => res.data)
      .then((data) => setWeather(data.current));

  useEffect(fetchWeather, [country.name]);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <br />
      <h2>Languages</h2>
      <LanguagesList languages={country.languages} />
      <br />
      <img src={country.flag} alt={`Flag of ${country.name}`} width={100} />
      <br/>
      {weather && <WeatherView capita={country.capital} weather={weather} />}
    </div>
  );
};

export default CountryDetails;
