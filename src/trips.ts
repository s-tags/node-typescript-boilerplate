import axios from 'axios';

interface ITripLocations {
  lat: number;
  lng: number;
  name: string;
  createdAt: string;
  _id: string;
}

export type PAYMENT_METHOD = 'CASH' | 'WALLET';

export type TRIP_STATUS =
  | 'SEARCHING'
  | 'REQUESTING'
  | 'ASSIGNED'
  | 'ARRIVED'
  | 'STARTED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_DRIVER';

export interface ITripResponse {
  tripLocations: ITripLocations[];
  logs: [];
  driverLogs: [];
  messages: [];
  paymentMethod: PAYMENT_METHOD;
  status: TRIP_STATUS;
  _id: string;
  passenger: any;
  fare: number;
  createdAt: Date;
  updatedAt: Date;
  driver: any;
}

interface ILocation {
  lat: number;
  lng: number;
  name: string;
}

export type IPaymentMethod = 'CASH' | 'WALLET';

interface IInitializeTripParameters {
  locations: ILocation[];
  paymentMethod: IPaymentMethod;
}

export const STATUS = Object.freeze({
  SEARCHING: 'SEARCHING',
  REQUESTING: 'REQUESTING',
  ASSIGNED: 'ASSIGNED',
  STARTED: 'STARTED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_DRIVER: 'NO_DRIVER',
});

export const getTripDetails = async (id: string) => {
  // prettier-ignore
  const result = await axios.get(`${(globalThis as any).__biyahe_sdk__.api}/trips/${id}`);

  return result.data;
};

interface TripLocations {
  lat: number;
  lng: number;
}

export interface IGenericTripResponse {
  tripLocations: TripLocations[];
  status: TRIP_STATUS;
  _id: string;
  fare: number;
  formattedFare: string;
}

export const initializeTrip = async (params: IInitializeTripParameters) =>
  // prettier-ignore
  await axios.post<IGenericTripResponse>(`${(globalThis as any).__biyahe_sdk__.api}/trips`, {
    passnger: '61a3c623888daa3f4ced5603', // todo: get in auth
    tripLocations: JSON.stringify(params.locations),
    paymentMethod: params.paymentMethod,
  });

export const confirmTrip = async (tripId: string) =>
  await axios.patch<IGenericTripResponse>(
    // prettier-ignore
    `${(globalThis as any).__biyahe_sdk__.api}/trips/${tripId}?action=SEARCH_DRIVER`,
    {},
  );

export const updateTripStatus = async (status: TRIP_STATUS) =>
  await axios.patch(`${(globalThis as any).__biyahe_sdk__.api}/trips`, {
    status,
  });

export const cancelTrip = async (tripId: string) =>
  // prettier-ignore
  await axios.patch(`${(globalThis as any).__biyahe_sdk__.api}/trips/${tripId}?action=CANCEL_TRIP`);

export const recomputeTrip = async (tripId: string, tripLocations: any[]) =>
  // prettier-ignore
  await axios.patch(`${(globalThis as any).__biyahe_sdk__.api}/trips/${tripId}?action=CHANGE_LOCATION`, {
    tripLocations: JSON.stringify(tripLocations),
  });
