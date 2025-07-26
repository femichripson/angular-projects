// src/app/app.ts
import { Component } from '@angular/core';
import { MovieBooking } from './components/movie-booking/movie-booking';

@Component({
  selector: 'app-root',
  standalone: true,
   imports: [MovieBooking], // Removed unused import to fix compile error
  templateUrl: './app.html',
  
})
export class App {}