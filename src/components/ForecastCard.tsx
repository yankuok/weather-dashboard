import React from "react";
import { WeatherData } from "../types/weather";
import { weatherApi } from "../services/weatherApi";

interface ForecastCardProps {
  data: WeatherData;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ data }) => {
  const { daily } = data;

  return (
    <div className="forecast-container">
      <h3>7-Day Forecast</h3>
      <div className="forecast-grid">
        {daily.time.map((date, idx) => (
          <div key={idx} className="forecast-item">
            <div className="forecast-date">
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="forecast-emoji">
              {weatherApi.getWeatherEmoji(daily.weatherCode[idx])}
            </div>
            <div className="forecast-temps">
              <span className="max">{Math.round(daily.maxTemp[idx])}°</span>
              <span className="min">{Math.round(daily.minTemp[idx])}°</span>
            </div>
            <div className="forecast-rain">
              💧 {Math.round(daily.precipitation[idx])}mm
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};