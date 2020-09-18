import * as React from "react";
import { Grid, Button, Box, makeStyles, Typography } from "@material-ui/core";

import LocationContainer from "./LocationContainer";
import { Map } from "./Map";
import { resolveGeocode } from "./ReverseGeocodeService";

const useStyles = makeStyles(() => ({
  mapSlot: {
    width: "100%",
    height: 300,
  },
}));

type SelectedLocation = { label: string; lat: number; lon: number } | null;

const formatSelectedLabel = (selectedLocation: SelectedLocation) => {
  if (!selectedLocation) {
    return "";
  }
  const lat = selectedLocation.lat.toFixed(2);
  const lon = selectedLocation.lon.toFixed(2);
  return `${selectedLocation.label} (lat: ${lat} lon: ${lon})`;
};

export const SelectLocation = () => {
  const locationContainer = LocationContainer.useContainer();
  const classes = useStyles();
  const [isSelectActive, setIsSelectActive] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState<
    SelectedLocation
  >(null);

  const handleConfirmSelection = () => {
    if (selectedLocation) {
      locationContainer.addLocation(selectedLocation);
    }
    setSelectedLocation(null);
    setIsSelectActive(false);
  };

  const handleMapClick = async ({ lat, lon }: { lat: number; lon: number }) => {
    const label = await resolveGeocode({ lat, lon });
    setSelectedLocation({ lat, lon, label });
  };

  const selectLocationLabel = locationContainer.locationData.length
    ? "ADD LOCATION"
    : "SELECT LOCATION";

  return (
    <Box mt={1} mb={4}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          {isSelectActive ? (
            <Button
              variant="contained"
              color="primary"
              disabled={!selectedLocation}
              onClick={handleConfirmSelection}
            >
              CONFIRM LOCATION
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsSelectActive(true)}
            >
              {selectLocationLabel}
            </Button>
          )}
        </Grid>
        <Grid item>
          {selectedLocation && (
            <Typography variant="subtitle1">
              {formatSelectedLabel(selectedLocation)}
            </Typography>
          )}
        </Grid>
      </Grid>

      {isSelectActive && (
        <Box mt={2} className={classes.mapSlot}>
          <Map
            onClick={handleMapClick}
            defaultLat={locationContainer.currentLocation?.lat}
            defaultLon={locationContainer.currentLocation?.lon}
          />
        </Box>
      )}
    </Box>
  );
};
