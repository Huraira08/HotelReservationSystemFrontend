import { Component, Input } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { BookingRequest } from '../../models/booking-request';
import { numberToStatus } from '../../models/booking-status';

@Component({
  selector: 'app-booking-card',
  standalone: true,
  imports: [
    NzFlexModule
  ],
  // templateUrl: './booking-card.component.html',
  template:`
  <div class="booking-card-container" nz-flex nzAlign="center">
    <img src="../../../assets/hotel-card-img.png" height="80" width="95" alt="">
    <div class="booking-content" nz-flex nzJustify="space-between">
      <div class="booking-info">
        <div class="info-heading">
          <h2>{{request.hotel?.name}}</h2>
          <p class="total-rent">Total Rent: {{request.totalRent}} </p>
        </div>
        <p class="date">{{getDate(request.checkInDate)}} - {{getDate(request.checkOutDate)}}</p>
      </div>
    </div>
    <div class="booking-status">
        Status: {{getStatus(request.bookingStatus)}}
    </div>
  </div>
  `,
  styleUrl: './booking-card.component.css'
})
export class BookingCardComponent {
  @Input() request!: BookingRequest

  getStatus(num: number){
    return numberToStatus(num)
  }

  getDate(date: Date){
    date = new Date(date);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
}
