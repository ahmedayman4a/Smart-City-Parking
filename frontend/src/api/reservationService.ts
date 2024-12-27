import apiClient from './apiClient';

import { ReservationDTO } from '../dtos/responses/ReservationDTO';

export const getReservations = async () => {
  const response = await apiClient.get('/reservation/'); // Backend endpoint
  return response.data;
};

interface ReserveSpotResponse {
  data: any;
}

export const reserveSpot = async (spotId: string): Promise<ReservationDTO> => {
  console.log('spotId', spotId);
  return new ReservationDTO({
    id: '1',
    spotId: '1',
    location: '123 Main St',
    startTime: new Date(),
    endTime: new Date(),
    status: 'reserved',
    totalPrice: 10.00
  });
  // const response: ReserveSpotResponse = await apiClient.post('/reservations', spotId);
  // return new ReservationDTO(response.data);
};