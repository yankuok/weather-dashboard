import React from "react";
import { WeatherData } from "../types/weather";
import { weatherApi } from "../services/weatherApi";

interface WeatherCardProps {
  data: WeatherData;
  locationName: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  data,
  locationName,
}) => {
  const { current } = data;
  const description = weatherApi.getWeatherDescription(
    current.weatherCode,
    current.isDay
  );
  const emoji = weatherApi.getWeatherEmoji(current.weatherCode, current.isDay);

  return (
    <div className="weather-card main-card">
      <h2>{locationName}</h2>
      <div className="current-weather">
        <div className="temperature-section">
          <span className="emoji">{emoji}</span>
          <span className="temperature">{current.temperature}°C</span>
        </div>
        <div className="weather-description">{description}</div>
      </div>
      <div className="weather-details">
        <div className="detail">
          <span className="label">Humidity</span>
          <span className="value">{current.humidity}%</span>
        </div>
        <div className="detail">
          <span className="label">Wind Speed</span>
          <span className="value">{current.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
};