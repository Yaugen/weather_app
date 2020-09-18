import * as React from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";

const formatTemperature = (temperature: number) => {
  const decimal = Math.floor(temperature);
  return `${decimal}°`;
};

interface TemperatureProps {
  temperatureData: TemperatureData;
}

const useStyles = makeStyles(() => ({
  dayTemp: {
    color: "#f77",
  },
  nightTemp: {
    color: "#77f",
  },
}));

export const Temperature: React.FC<TemperatureProps> = ({
  temperatureData,
}) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item container justify="space-between">
        <Grid item>
          <Typography variant="h6">Day</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">Night</Typography>
        </Grid>
      </Grid>
      <Grid item container justify="space-between">
        <Grid item>
          <Typography variant="h3" className={classes.dayTemp}>
            {formatTemperature(temperatureData.day)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h3">/</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h3" className={classes.nightTemp}>
            {formatTemperature(temperatureData.night)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
