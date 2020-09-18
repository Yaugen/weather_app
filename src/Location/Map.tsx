import * as React from "react";
import GoogleMapReact from "google-map-react";

import { GOOGLE_KEY } from "../keys";

interface MapProps {
  defaultLat?: number;
  defaultLon?: number;
  onClick?(arg: { lat: number; lon: number }): void;
}

export const Map: React.FC<MapProps> = ({
  defaultLat = 53.919913,
  defaultLon = 27.568626,
  onClick = () => {},
}) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: GOOGLE_KEY,
      }}
      defaultCenter={{ lat: defaultLat, lng: defaultLon }}
      defaultZoom={11}
      onClick={({ lat, lng }) => onClick({ lat, lon: lng })}
    ></GoogleMapReact>
  );
};
