// src/app/seat.model.ts
export interface Seat {
  id: string;
  row: string;
  seatNumber: number;
  price: number;
  status: 'available' | 'selected' | 'booked' | 'fast-selling';
}