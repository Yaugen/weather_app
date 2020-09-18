interface TemperatureData {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

interface WeatherItem {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface DailyWeatherItem {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: TemperatureData;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherItem[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
}

interface OpenWeatherOneCallResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  daily: DailyWeatherItem[];
}
