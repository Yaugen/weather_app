import * as React from "react";
import { createContainer } from "unstated-next";
import { resolveGeocode } from "./ReverseGeocodeService";

const LOCAL_STORAGE_KEY = "PERSISTED_LOCATION_DATA";
export const CURRENT_LOCATION_ID = "current_location";

const createLocationDataItem = (newLocation: LocationInput) => {
  const id = newLocation.id || Date.now().toString();
  return {
    id,
    label: newLocation.label || `LOC_${id}`,
    lat: newLocation.lat,
    lon: newLocation.lon,
    isCurrent: !!newLocation.isCurrent,
  };
};

const persist = (data: LocationData[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

const getCurrentLocation = () =>
  new Promise<Coordinates>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve(coords);
      },
      (e) => {
        reject(e);
      }
    );
  });

const useLocationData = () => {
  const [isReady, setIsReady] = React.useState(false);
  const [locationData, setLocationData] = React.useState<LocationData[]>([]);
  const [
    currentLocation,
    setCurrentLocation,
  ] = React.useState<LocationData | null>(null);

  const updateLocationData = React.useCallback(
    (newLocationData: LocationData[]) => {
      setLocationData(newLocationData);
      persist(newLocationData);
    },
    []
  );

  const addLocation = React.useCallback(
    (newLocation: LocationInput) => {
      updateLocationData([
        ...locationData,
        createLocationDataItem(newLocation),
      ]);
    },
    [locationData, updateLocationData]
  );

  const removeLocation = React.useCallback(
    (idToRemove: string) => {
      updateLocationData(locationData.filter(({ id }) => id !== idToRemove));
    },
    [locationData, updateLocationData]
  );

  React.useEffect(() => {
    (async function () {
      if (locationData.length || isReady) {
        return;
      }

      const persistedLocationDataString = await localStorage.getItem(
        LOCAL_STORAGE_KEY
      );
      const persistedLocationData: LocationData[] = JSON.parse(
        persistedLocationDataString || "[]"
      );

      let currentLocation;
      try {
        const currentCoords = await getCurrentLocation();
        const label = await resolveGeocode({
          lat: currentCoords.latitude,
          lon: currentCoords.longitude,
        });
        currentLocation = createLocationDataItem({
          id: CURRENT_LOCATION_ID,
          label,
          lat: currentCoords.latitude,
          lon: currentCoords.longitude,
          isCurrent: true,
        });
      } catch (e) {
        console.error(e);
      }

      let locations = persistedLocationData.filter(
        ({ isCurrent }) => !isCurrent
      );
      if (currentLocation) {
        locations = [currentLocation, ...locations];
        setCurrentLocation(currentLocation);
      }

      updateLocationData(locations);
      setIsReady(true);
    })();
  }, [isReady, locationData, updateLocationData]);

  return {
    isReady,
    locationData,
    currentLocation,
    addLocation,
    removeLocation,
  };
};

export default createContainer(useLocationData);
