import React, { useState, useEffect } from "react";
import "./WeatherApp.css";


const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Palakkad");
  const [error, setError] = useState(null);

  const API_KEY = "8ac5c4d57ba6a4b3dfcf622700447b1e";
  const fetchWeather = async () => {
    if (!city.trim()) {
      setError(null);
      setWeather(null); 
      return;
    }

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchWeather(); 
  }, []);

  const handleCityChange = (e) => setCity(e.target.value);

  return (
    <div className="weather-app">
      <div className="overlay">
        <h1 className="text-center fw-bold mb-4">Weather Application <i class="fa-solid fa-cloud fa-bounce text-info"></i></h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group mb-3">
              <input type="text" className="form-control custom-input" placeholder="Enter city name" value={city} onChange={handleCityChange} />
              <button className="btn btn-primary custom-button" onClick={fetchWeather}>
              <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
        </div>

        {error ? (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        ) : weather ? (
          <div className="card bg-dark mx-auto mt-4 custom-card">
            <div className="card-body text-center">
              <h5 className="card-title text-light">
                {weather.name}, {weather.sys.country}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {weather.weather[0].description}
              </h6>
              <p className="card-text text-light">Temperature: {weather.main.temp}°C</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
          </div>
        ) : (
          !error && <div className="text-center mt-4">Please enter a city name !!</div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
