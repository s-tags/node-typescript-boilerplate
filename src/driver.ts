import axios from 'axios';

export type DRIVER_AVAILABILITY = 'AVAILABLE' | 'UNAVAILABLE';

export const acceptTrip = async (tripId: string) => {
  // prettier-ignore
  const result = await axios.patch(`${(globalThis as any).__biyahe_sdk__.api}/trips/${tripId}?action=ACCEPT_TRIP`);

  return result.data;
};

export const rejectTrip = async (tripId: string) => {
  // prettier-ignore
  const result = await axios.patch(`${(globalThis as any).__biyahe_sdk__.api}/trips/${tripId}?action=REJECT_TRIP`);

  return result.data;
};

export const setAvailability = async (availability: DRIVER_AVAILABILITY) => {
  const result = await axios.patch(
    // prettier-ignore
    `${(globalThis as any).__biyahe_sdk__.api}/drivers/61a3e2ab089f375c6949a58b?action=AVAILABILITY`, // todo: replace with driver id on auth
    {
      availability,
    },
  );

  return result.data;
};
