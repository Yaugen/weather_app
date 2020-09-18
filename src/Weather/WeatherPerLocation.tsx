import * as React from "react";
import { Typography, Box } from "@material-ui/core";

import LocationContainer from "../Location/LocationContainer";
import WeatherContainer from "./WeatherContainer";
import { WeatherList } from "./WeatherList";

export const WeatherPerLocation = () => {
  const { locationData, isReady } = LocationContainer.useContainer();

  if (!isReady) {
    return <div>LOADING...</div>;
  }

  if (!locationData.length) {
    return (
      <Typography variant="h3" color="textPrimary">
        Please select location or allow access to geoposition
      </Typography>
    );
  }

  return (
    <>
      {locationData.map((locationDataItem) => (
        <WeatherContainer.Provider
          key={locationDataItem.id}
          initialState={locationDataItem}
        >
          <Box mb={4}>
            <WeatherList />
          </Box>
        </WeatherContainer.Provider>
      ))}
    </>
  );
};
