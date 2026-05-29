import { WeatherData, GeocodingResult, LocationData } from "../types/weather";

const OPEN_METEO_API = "https://api.open-meteo.com/v1";
const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1";

export const weatherApi = {
  // Search for locations
  async searchLocations(query: string): Promise<GeocodingResult[]> {
    if (!query || query.length < 2) return [];

    try {
      const response = await fetch(
        `${GEOCODING_API}/search?name=${encodeURIComponent(
          query
        )}&count=5&language=en&format=json`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Geocoding error:", error);
      return [];
    }
  },

  // Fetch current and forecast weather
  async getWeather(
    latitude: number,
    longitude: number
  ): Promise<WeatherData | null> {
    try {
      const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        current:
          "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day",
        hourly: "temperature_2m,precipitation",
        daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
        timezone: "auto",
        forecast_days: "7",
      });

      const response = await fetch(
        `${OPEN_METEO_API}/forecast?${params.toString()}`
      );
      const data = await response.json();

      if (!data.current) return null;

      return {
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        current: {
          temperature: Math.round(data.current.temperature_2m),
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m * 10) / 10,
          weatherCode: data.current.weather_code,
          isDay: data.current.is_day,
        },
        hourly: {
          time: data.hourly.time,
          temperature2m: data.hourly.temperature_2m,
          precipitation: data.hourly.precipitation,
        },
        daily: {
          time: data.daily.time,
          maxTemp: data.daily.temperature_2m_max,
          minTemp: data.daily.temperature_2m_min,
          precipitation: data.daily.precipitation_sum,
          weatherCode: data.daily.weather_code,
        },
      };
    } catch (error) {
      console.error("Weather API error:", error);
      return null;
    }
  },

  // Get weather description from WMO code
  getWeatherDescription(code: number, isDay: boolean = true): string {
    const weatherCodes: Record<number, string> = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Foggy",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Heavy drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      71: "Slight snow",
      73: "Moderate snow",
      75: "Heavy snow",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with hail",
      99: "Thunderstorm with hail",
    };
    return weatherCodes[code] || "Unknown";
  },

  // Get emoji based on weather code
  getWeatherEmoji(code: number, isDay: boolean = true): string {
    if (code === 0) return isDay ? "☀️" : "🌙";
    if (code === 1 || code === 2) return isDay ? "🌤️" : "🌥️";
    if (code === 3) return "☁️";
    if (code === 45 || code === 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 86) return "❄️";
    if (code >= 80 && code <= 82) return "⛈️";
    if (code >= 85 && code <= 86) return "🌨️";
    if (code >= 95 && code <= 99) return "⛈️";
    return "🌡️";
  },
};