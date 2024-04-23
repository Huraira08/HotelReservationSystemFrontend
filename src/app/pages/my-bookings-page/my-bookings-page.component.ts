import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { BookingService } from '../../services/booking/booking.service';
import { BookingCardComponent } from '../../components/booking-card/booking-card.component';
import { User } from '../../models/user';
import { BookingRequest } from '../../models/booking-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-bookings-page',
  standalone: true,
  imports: [
    BookingCardComponent,

    CommonModule
  ],
  templateUrl: './my-bookings-page.component.html',
  styleUrl: './my-bookings-page.component.css'
})
export class MyBookingsPageComponent implements OnInit {

  requests: BookingRequest[] = []
  constructor(
    private authService: AuthService,
    private bookingsService: BookingService
  ){}

  async ngOnInit() {
    const user: User = await this.authService.getUser();
    console.log(user)
    this.requests = await this.bookingsService.getByUserId(user.id)
    console.log(this.requests)
  }
}
