import React from "react";

import LocationContainer from "./Location/LocationContainer";
import { SelectLocation } from "./Location/SelectLocation";
import { WeatherPerLocation } from "./Weather/WeatherPerLocation";
import { Container } from "@material-ui/core";

export const App = () => {
  return (
    <LocationContainer.Provider>
      <Container maxWidth="md">
        <SelectLocation />
        <WeatherPerLocation />
      </Container>
    </LocationContainer.Provider>
  );
};
