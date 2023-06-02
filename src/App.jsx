import React, { useState } from 'react';
import Axios from 'axios';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [zipcode, setZipCode] = useState('');

  const weatherApp = () => {
    const apiKey = '093c902130614d44a72bc29550dbae41';
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${apiKey}`;

    Axios.get(url)
      .then((res) => setWeatherData(res.data))
      .catch((error) => console.log(error));
  };

  const handleInputChange = (event) => {
    setZipCode(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ZIP code"
        value={zipcode}
        onChange={handleInputChange}
      />
      <button onClick={weatherApp}>Get Weather</button>

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
