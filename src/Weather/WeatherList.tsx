import * as React from "react";
import { WeatherCard } from "./WeatherCard";
import { Grid, Typography, Button } from "@material-ui/core";

import WeatherContainer from "./WeatherContainer";
import LocationContainer from "../Location/LocationContainer";

const formatLabel = (locationData: LocationData | null) => {
  if (locationData?.isCurrent) {
    return `Your location, ${locationData?.label}`;
  }
  return locationData?.label;
};

export const WeatherList = () => {
  const locationContainer = LocationContainer.useContainer();
  const { weatherData, locationData } = WeatherContainer.useContainer();

  const handleRemoveClick = () => {
    if (locationData) {
      locationContainer.removeLocation(locationData.id);
    }
  };

  return (
    <Grid container>
      <Grid item container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            {formatLabel(locationData)}
          </Typography>
        </Grid>
        {!locationData?.isCurrent && (
          <Grid item>
            <Button color="secondary" onClick={handleRemoveClick}>
              Remove
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid item container justify="center" alignItems="center" spacing={3}>
        {weatherData.map((dataItem, key) => (
          <Grid item key={key}>
            <WeatherCard item={dataItem} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
