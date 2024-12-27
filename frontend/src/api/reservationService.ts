import apiClient from './apiClient';

import { ReservationDTO } from '../dtos/responses/ReservationDTO';

export const getReservations = async () => {
  const response = await apiClient.get('/reservations'); // Backend endpoint
  // Map response data to DTO
  return response.data.map((reservation: any): ReservationDTO => new ReservationDTO(reservation));
};
