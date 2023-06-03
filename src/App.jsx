import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [zipcode, setZipCode] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const weatherApp = () => {
    
    const apiKey = '093c902130614d44a72bc29550dbae41'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}`;


    setIsFetching(true);

    axios
      .get(url)
      .then((res) => {
        setWeatherData(res.data);
        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error);
        setIsFetching(false);
      });
  };

  const handleInputChange = (event) => {
    const input = event.target.value
    const numericInput = input.replace(/\D/g);

    setZipCode( numericInput )
  };

  return (
    <div className="container">
      <h1 className="weather-title">What's the weather</h1>

      <div className="center-content">
        <input
          className="input-size"
          type="text"
          placeholder="Enter ZIP code"
          value={zipcode}
          onChange={handleInputChange}
          pattern = "[0-9]"
        />
        <button className="button-size" onClick={weatherApp} disabled={isFetching}>
          Get Weather
        </button>
      </div>

      {weatherData && (
        <div>
          <h2>Weather for {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Conditions: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
