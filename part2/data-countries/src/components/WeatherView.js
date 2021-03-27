import React from 'react';

const WeatherView = ({ capital, weather }) => {
  const [weatherIcon] = weather?.weather_icons;
  const [weatherDescription] = weather?.weather_descriptions;
  return (
    <>
      <h3>Weather in {capital}</h3>
      <p>temperature: {weather?.temperature} Celsius</p>
      <img src={weatherIcon} alt={weatherDescription} width={50} />
      <p>
        wind: {weather?.wind_speed} mph direction {weather?.wind_dir}
      </p>
    </>
  );
};

export default WeatherView;
