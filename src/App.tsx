import React, { useState, useEffect } from "react";
import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";
import { ForecastCard } from "./components/ForecastCard";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { weatherApi } from "./services/weatherApi";
import { WeatherData } from "./types/weather";
import "./App.css";

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [locationName, setLocationName] = useState<string>("Loading...");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Fetch weather for a location
  const fetchWeather = async (
    latitude: number,
    longitude: number,
    name: string
  ) => {
    setLoading(true);
    setError("");
    const data = await weatherApi.getWeather(latitude, longitude);
    if (data) {
      setWeather(data);
      setLocationName(name);
    } else {
      setError("Failed to fetch weather data. Please try again.");
    }
    setLoading(false);
  };

  // Load default location on mount (using browser geolocation or default city)
  useEffect(() => {
    const loadDefaultWeather = async () => {
      try {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              fetchWeather(
                position.coords.latitude,
                position.coords.longitude,
                "Current Location"
              );
            },
            () => {
              // Fallback to New York if geolocation fails
              fetchWeather(40.7128, -74.006, "New York");
            }
          );
        } else {
          fetchWeather(40.7128, -74.006, "New York");
        }
      } catch (err) {
        setError("Unable to load weather data");
      }
    };

    loadDefaultWeather();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌍 Weather Dashboard</h1>
        <SearchBar onLocationSelect={fetchWeather} />
      </header>

      <main className="app-main">
        {loading && <LoadingSpinner />}
        {error && <div className="error-message">{error}</div>}
        {weather && !loading && (
          <>
            <WeatherCard data={weather} locationName={locationName} />
            <ForecastCard data={weather} />
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>Weather data provided by Open-Meteo (Free API)</p>
      </footer>
    </div>
  );
}

export default App;