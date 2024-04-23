import { Component } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-booking-card',
  standalone: true,
  imports: [
    NzFlexModule
  ],
  // templateUrl: './booking-card.component.html',
  template:`
  <div class="booking-card-container" nz-flex>
    <img src="../../../assets/hotel-card-img.png" height="80" width="95" alt="">
    <div class="booking-content">
      <div class="booking-info"></div>
      <div class="booking-actions">
        <h2>Apollo Panorama Guesthouse</h2>
        <p class="hotel-address">2 Tuxion Road, 3233 Apollo Bay, Australia </p>
        <p class="date">12 Sep, 2022 - 16 Sep, 2022</p>
      </div>
    </div>
  </div>
  `,
  styleUrl: './booking-card.component.css'
})
export class BookingCardComponent {

}
