import apiClient from './apiClient';

import { ReservationDTO } from '../dtos/responses/ReservationDTO';

export const getReservations = async () => {
  const response = await apiClient.get('/reservation/'); // Backend endpoint
  return response.data;
};

interface ReserveSpotResponse {
  data: any;
}

export const reserveSpot = async (ReservationRequest: any): Promise<ReservationDTO> => {
  const response: ReserveSpotResponse = await apiClient.post('/reservation/reserve', ReservationRequest);
  return new ReservationDTO(response.data);
}