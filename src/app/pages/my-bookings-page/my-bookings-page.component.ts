import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { BookingService } from '../../services/booking/booking.service';
import { BookingCardComponent } from '../../components/booking-card/booking-card.component';

@Component({
  selector: 'app-my-bookings-page',
  standalone: true,
  imports: [
    BookingCardComponent
  ],
  templateUrl: './my-bookings-page.component.html',
  styleUrl: './my-bookings-page.component.css'
})
export class MyBookingsPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private bookingsService: BookingService
  ){}

  async ngOnInit() {
    const userBookings = await this.bookingsService.getByUserId('3FA85F64-5717-4562-B3FC-2C963F66AFA6')
    console.log(userBookings)
  }
}
