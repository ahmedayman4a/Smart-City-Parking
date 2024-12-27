export class ReservationRequest {
  lotId: string;
  startTime: Date;
  endTime: Date;
  paymentMethod: string;

  constructor({ lotId, startTime, endTime, paymentMethod }: { lotId: string; startTime: Date; endTime: Date; paymentMethod: string }) {
    this.lotId = lotId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.paymentMethod = paymentMethod;
  }
}