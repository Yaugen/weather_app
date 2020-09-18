import { http } from "../utils";

type Coords = {
  lat: number;
  lon: number;
};

interface ReverseGeocodeResponseBody {
  city: string;
  countryName: string;
}

export const resolveGeocode = async ({ lat, lon }: Coords) => {
  const data = await http<ReverseGeocodeResponseBody>(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
  );
  const { city, countryName } = data.parsedBody ?? {
    city: "",
    countryName: "",
  };
  return [city, countryName].filter(Boolean).join(", ");
};
