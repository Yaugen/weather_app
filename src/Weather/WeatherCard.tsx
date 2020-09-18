import * as React from "react";
import { format } from "date-fns";
import {
  Card,
  makeStyles,
  CardMedia,
  CardContent,
  Typography,
  CardHeader,
} from "@material-ui/core";

import { Temperature } from "./Temperature";
import { Wind } from "./Wind";

const useStyles = makeStyles(() => ({
  root: {
    width: 200,
  },
  title: {},
  media: {
    width: 150,
    height: 110,
    margin: "0 auto",
  },
  header: {
    textAlign: "right",
  },
}));

interface WeatherCardProps {
  item: DailyWeatherItem;
}

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return format(date, "ccc, PP");
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ item }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader subheader={formatDate(item.dt)} className={classes.header} />
      <CardMedia
        className={classes.media}
        image={`http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
      />
      <CardContent>
        <Typography variant="h6">{item.weather[0].main}</Typography>
        <Temperature temperatureData={item.temp} />
        <Wind windDeg={item.wind_deg} windSpeed={item.wind_speed} />
      </CardContent>
    </Card>
  );
};
