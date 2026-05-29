export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    weatherCode: number;
    isDay: boolean;
  };
  hourly: {
    time: string[];
    temperature2m: number[];
    precipitation: number[];
  };
  daily: {
    time: string[];
    maxTemp: number[];
    minTemp: number[];
    precipitation: number[];
    weatherCode: number[];
  };
}

export interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
}