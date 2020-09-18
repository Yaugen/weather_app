import * as React from "react";
import { makeStyles, Grid, Typography, Box } from "@material-ui/core";

import { WindIcon } from "./WindIcon";

interface WindProps {
  windDeg: number;
  windSpeed: number;
}

interface StyleProps {
  deg: number;
}

const useStyles = makeStyles(() => ({
  icon: {
    transform: (props: StyleProps) => `rotate(${props.deg}deg)`,
  },
}));

const formatWindSpeed = (speed: number) => {
  return `${speed.toFixed(1)} m\\s`;
};

const getWindColor = (speed: number) => {
  // according to https://en.wikipedia.org/wiki/Beaufort_scale
  if (speed < 3.3) {
    return "#94f29a";
  } else if (speed < 10.7) {
    return "#f1d593";
  }
  return "#f77";
};

export const Wind: React.FC<WindProps> = ({ windDeg, windSpeed }) => {
  const classes = useStyles({ deg: windDeg });
  return (
    <Box mt={1}>
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="h6">Wind:</Typography>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <WindIcon
                fill={getWindColor(windSpeed)}
                className={classes.icon}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6">{formatWindSpeed(windSpeed)}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
