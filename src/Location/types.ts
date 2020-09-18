export interface LocationData {
  id: string;
  label: string;
  lat: number;
  lon: number;
  isCurrent: boolean;
}

export interface LocationInput {
  id?: string;
  label?: string;
  lat: number;
  lon: number;
  isCurrent?: boolean;
}
