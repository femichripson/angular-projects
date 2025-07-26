
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Booking } from '../../booking';
import { Seat } from '../../seat.model';

@Component({
  selector: 'app-movie-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-booking.html',
  styleUrls: ['./movie-booking.css']
})
export class MovieBooking implements OnInit {
rows: string[] = ['A', 'B', 'C', 'D', 'E'];
  seats: Seat[][] = [];
  selectedSeats: string[] = [];
  seatCount: number = 2; // Default value set to 2
  totalPrice: number = 0;
  prices: { [key: string]: number } = {
    A: 250,
    B: 250,
    C: 200,
    D: 200,
    E: 150,
  };

  constructor(private bookingService: Booking) {}

  ngOnInit(): void {
    this.generateSeats();
    this.selectedSeats = this.bookingService.getSelectedSeats();
    this.updateTotalPrice();
  }

  generateSeats(): void {
    const flatSeats = this.bookingService.getSeats();
    this.seats = this.rows.map((row) =>
      flatSeats
        .filter((seat) => seat.row === row)
        .sort((a, b) => a.seatNumber - b.seatNumber)
    );
  }

  selectSeat(seatId: string): void {
    if (this.bookingService.selectAdjacentSeats(seatId, this.seatCount)) {
      this.selectedSeats = this.bookingService.getSelectedSeats();
      this.generateSeats(); // Refresh seat statuses
      this.updateTotalPrice();
    }
  }

  onSeatCountChange(): void {
    if (this.seatCount < 1 || this.seatCount > 10) {
      this.seatCount = 2; // Reset to default if invalid
      this.bookingService.setErrorMessage('Please select between 1 and 10 seats.');
    } else {
      this.bookingService.clearSelectedSeats();
      this.selectedSeats = [];
      this.generateSeats();
    }
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    this.totalPrice = this.selectedSeats.reduce((total, seatId) => {
      const seat = this.seats.flat().find((s) => s.id === seatId);
      return total + (seat ? seat.price : 0);
    }, 0);
  }

  bookSeats(): void {
    if (this.selectedSeats.length !== this.seatCount) {
      this.bookingService.setErrorMessage(
        `Please select exactly ${this.seatCount} seat(s).`
      );
      return;
    }
    this.bookingService.bookSelectedSeats();
    this.generateSeats();
    this.selectedSeats = [];
    this.updateTotalPrice();
  }

  get errorMessage(): string {
    return this.bookingService.getErrorMessage();
  }

  get successMessage(): string {
    return this.bookingService.getSuccessMessage();
  }
}
