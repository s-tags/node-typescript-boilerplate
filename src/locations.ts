import axios from 'axios';

export const autocomplete = async (query: string) => {
  // prettier-ignore
  const result = await axios.get(`${(globalThis as any).__biyahe_sdk__.api}/locations`, {
    params: {
      action: 'SEARCH_LOCATION',
      query,
    },
  });

  return result.data;
};

export interface IGetLocationDetailsResponse {
  id: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
}

export const getLocationDetails = async (
  id: string,
): Promise<IGetLocationDetailsResponse> => {
  // prettier-ignore
  const result = await axios.get(`${(globalThis as any).__biyahe_sdk__.api}/locations`, {
    params: {
      action: 'SEARCH_DETAILS',
      id,
    },
  });

  return result.data;
};

export const getLocationViaCoordinates = async (
  lat: number,
  lng: number,
): Promise<IGetLocationDetailsResponse | null> => {
  // prettier-ignore
  const result = await axios.get(`${(globalThis as any).__biyahe_sdk__.api}/locations`, {
    params: {
      action: 'REVERSE_GEOCODE',
      lat,
      lng,
    },
  });

  return {
    id: result?.data?.id,
    coordinates: result?.data?.coordinates,
    address: result?.data?.address,
  };
};

interface ICoordinates {
  lng: number;
  lat: number;
}

export interface IGetDirectionResponse {
  duration: number;
  distance: number;
  coordinates: [number, number][];
}

export const getDirections = async (
  from: ICoordinates,
  to: ICoordinates,
): Promise<IGetDirectionResponse | null> => {
  // prettier-ignore
  const result = await axios.get(`${(globalThis as any).__biyahe_sdk__.api}/locations`, {
    params: {
      action: 'DIRECTIONS',
      oLat: from.lat,
      oLng: from.lng,
      dLat: to.lat,
      dLng: to.lng,
    },
  });

  return result.data;
};
