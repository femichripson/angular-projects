import { Injectable } from '@angular/core';
import { Seat } from './seat.model';

@Injectable({
  providedIn: 'root'
})
export class Booking {
 private seats: Seat[] = [];
  private errorMessage: string = '';
  private successMessage: string = '';

  constructor() {
    this.generateSeats();
  }

  private generateSeats(): void {
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const prices: { [key: string]: number } = { A: 250, B: 250, C: 200, D: 200, E: 150 };
    const bookedSeats = ['A7', 'A8', 'B5', 'C6', 'C7', 'C8', 'C9', 'E3', 'E4', 'E5'];
    const fastSellingSeats = ['A3', 'A4', 'A10', 'B8', 'B9', 'D1', 'E10'];

    for (const row of rows) {
      for (let seatNumber = 1; seatNumber <= 10; seatNumber++) {
        const id = `${row}${seatNumber}`;
        const status = bookedSeats.includes(id)
          ? 'booked'
          : fastSellingSeats.includes(id)
          ? 'fast-selling'
          : 'available';
        this.seats.push({
          id,
          row,
          seatNumber,
          price: prices[row],
          status,
        });
      }
    }
  }

  getSeats(): Seat[] {
    return [...this.seats];
  }

  selectAdjacentSeats(clickedSeatId: string, maxSeats: number): boolean {
    if (maxSeats < 1 || maxSeats > 10) {
      this.errorMessage = 'Please select between 1 and 10 seats.';
      return false;
    }

    const clickedSeat = this.seats.find((s) => s.id === clickedSeatId);
    if (!clickedSeat || clickedSeat.status === 'booked') {
      this.errorMessage = 'Cannot select booked seats.';
      return false;
    }

    this.clearSelectedSeats(); // Clear any existing selections

    const row = clickedSeat.row;
    const seatNumber = clickedSeat.seatNumber;
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const currentRowIndex = rows.indexOf(row);

    // Collect available seats in the current row
    const currentRowSeats = this.seats
      .filter((s) => s.row === row && s.status !== 'booked')
      .sort((a, b) => a.seatNumber - b.seatNumber);

    // Try to select maxSeats starting from or including the clicked seat
    let selectedSeats: Seat[] = [];
    if (clickedSeat.status !== 'selected') {
      selectedSeats.push(clickedSeat);
    }

    // Step 1: Try to fill with seats in the current row, prioritizing those closest to clicked seat
    for (const seat of currentRowSeats) {
      if (seat.id !== clickedSeatId && selectedSeats.length < maxSeats) {
        selectedSeats.push(seat);
      }
    }

    // Step 2: If fewer than maxSeats in current row, continue to next rows
    if (selectedSeats.length < maxSeats) {
      for (let i = currentRowIndex + 1; i < rows.length; i++) {
        const nextRowSeats = this.seats
          .filter((s) => s.row === rows[i] && s.status !== 'booked')
          .sort((a, b) => a.seatNumber - b.seatNumber);
        for (const seat of nextRowSeats) {
          if (selectedSeats.length < maxSeats) {
            selectedSeats.push(seat);
          }
        }
        if (selectedSeats.length >= maxSeats) {
          break;
        }
      }
    }

    // Step 3: Check if we have enough seats
    if (selectedSeats.length >= maxSeats) {
      selectedSeats.slice(0, maxSeats).forEach((s) => (s.status = 'selected'));
      this.errorMessage = '';
      return true;
    }

    this.errorMessage = `Not enough available seats to select ${maxSeats}.`;
    return false;
  }

  getSelectedSeats(): string[] {
    return this.seats.filter((s) => s.status === 'selected').map((s) => s.id);
  }

  clearSelectedSeats(): void {
    this.seats.forEach((seat) => {
      if (seat.status === 'selected') {
        seat.status = this.fastSellingSeats.includes(seat.id) ? 'fast-selling' : 'available';
      }
    });
    this.errorMessage = '';
  }

  bookSelectedSeats(): void {
    const selectedSeats = this.getSelectedSeats();
    if (selectedSeats.length === 0) {
      this.errorMessage = 'Please select seats!';
      this.successMessage = '';
      return;
    }
    this.seats.forEach((seat) => {
      if (seat.status === 'selected') {
        seat.status = 'booked';
      }
    });
    this.successMessage = `Booking confirmed for seats: ${selectedSeats.join(', ')}`;
    this.errorMessage = '';
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }

  getSuccessMessage(): string {
    return this.successMessage;
  }

  setErrorMessage(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
  }

  private fastSellingSeats = ['A3', 'A4', 'A10', 'B8', 'B9', 'D1', 'E10'];
}
