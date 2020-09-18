import * as React from "react";
import { createContainer } from "unstated-next";
import { http } from "../utils";
import { OPEN_WEATHER_KEY } from "../keys";

const useWeatherData = (initialState?: LocationData) => {
  const [locationData] = React.useState<LocationData | null>(
    initialState || null
  );
  const [weatherData, setWeatherData] = React.useState<DailyWeatherItem[]>([]);

  React.useEffect(() => {
    (async function () {
      if (!locationData) {
        return;
      }

      const response = await http<OpenWeatherOneCallResponse>(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${locationData.lat}&lon=${locationData.lon}&exclude=current,minutely,hourly&appid=${OPEN_WEATHER_KEY}&units=metric`
      );

      const receivedWeatherData = response.parsedBody?.daily ?? [];
      setWeatherData(receivedWeatherData.slice(0, 4));
    })();
  }, [locationData]);
  return { locationData, weatherData };
};

export default createContainer(useWeatherData);
