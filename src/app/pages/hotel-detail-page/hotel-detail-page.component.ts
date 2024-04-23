import { Component } from '@angular/core';
import { BookBtnComponent } from '../../components/book-btn/book-btn.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFlexModule, NzAlign } from 'ng-zorro-antd/flex';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { FacilityCardComponent } from '../../components/facility-card/facility-card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Hotel } from '../../models/hotel';
import { BookingRequest } from '../../models/booking-request';
import { BookingStatus } from '../../models/booking-status';
import { BookingService } from '../../services/booking/booking.service';

@Component({
  selector: 'app-hotel-detail-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    BookBtnComponent,
    NzGridModule,
    NzFlexModule,
    NzDatePickerModule,
    FacilityCardComponent
  ],
  templateUrl: './hotel-detail-page.component.html',
  styleUrl: './hotel-detail-page.component.css'
})
export class HotelDetailPageComponent {
  checkInDate = new Date();
  checkOutDate = new Date();
  facilities = [
    {
      facilityName: 'Swimming Pool',
      logoPath: '../../../assets/swimming-logo.png'
    },
    {
      facilityName: 'Wifi',
      logoPath: '../../../assets/wifi-logo.png'
    },
    {
      facilityName: 'Breakfast',
      logoPath: '../../../assets/food-logo.png'
    },
    {
      facilityName: 'Gym',
      logoPath: '../../../assets/gym-logo.png'
    },
    {
      facilityName: 'Game center',
      logoPath: '../../../assets/game-logo.png'
    },
    {
      facilityName: '24/7 Light',
      logoPath: '../../../assets/light-logo.png'
    },
    {
      facilityName: 'Laundry',
      logoPath: '../../../assets/laundry-logo.png'
    },
    {
      facilityName: 'Parking space',
      logoPath: '../../../assets/parking-logo.png'
    }
  ]
  hotel!: Hotel
  constructor(private router: Router, private bookingService: BookingService){
    this.hotel = this.router.getCurrentNavigation()!.extras!.state!['hotel']
    console.log(this.hotel)
  }

  async submitBooking(){
    const bookingRequest: BookingRequest = {
      id: '',
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      totalRent: 100,
      bookingStatus: BookingStatus.Pending,
      hotelId: this.hotel.id,
      userId: 'E2067BCA-292C-4EAB-A9DE-A4FDEB1F9BC0'
    }

    console.log(bookingRequest);
    const rowsAffected:number = await this.bookingService.createBooking(bookingRequest)
    console.log(rowsAffected)
    // const bookingList = await this.bookingService.getAll();
    // console.log(bookingList);
  }
}
