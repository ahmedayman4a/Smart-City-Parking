export class ReservationDTO {
  id: string;
  spotId: string;
  location: string;
  startTime: Date;
  endTime: Date;
  status: string;
  totalPrice: number;

  constructor({ id, spotId, location, startTime, endTime, status, totalPrice }: 
  { 
    id: string; 
    spotId: string; 
    location: string; 
    startTime: string | Date; 
    endTime: string | Date; 
    status: string; 
    totalPrice: number; 
  }) {
    this.id = id;
    this.spotId = spotId;
    this.location = location;
    this.startTime = new Date(startTime);
    this.endTime = new Date(endTime);
    this.status = status;
    this.totalPrice = totalPrice;
  }
}
