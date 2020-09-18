export interface TemperatureData {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}
export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}
export interface WeatherItem {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface DailyWeatherItem {
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
export interface OpenWeatherOneCallResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  daily: DailyWeatherItem[];
}
