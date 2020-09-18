interface LocationData {
  id: string;
  label: string;
  lat: number;
  lon: number;
  isCurrent: boolean;
}

interface LocationInput {
  id?: string;
  label?: string;
  lat: number;
  lon: number;
  isCurrent?: boolean;
}
