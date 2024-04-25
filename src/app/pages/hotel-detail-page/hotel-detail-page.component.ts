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
import { AuthService } from '../../services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSpinModule } from 'ng-zorro-antd/spin';

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
    FacilityCardComponent,
    NzSpinModule
  ],
  templateUrl: './hotel-detail-page.component.html',
  styleUrl: './hotel-detail-page.component.css'
})
export class HotelDetailPageComponent {
  checkInDate = new Date();
  checkOutDate = new Date();
  isLoggedIn = false;
  error = ''
  isLoading = false;
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
  constructor(private router: Router, 
    private bookingService: BookingService,
    private authService: AuthService,
    private notification: NzNotificationService
  ){
    this.hotel = this.router.getCurrentNavigation()!.extras!.state!['hotel']
    this.authService.isLoggedIn().subscribe({
      next: isLoggedIn => this.isLoggedIn = isLoggedIn,
      error: err => console.log(err)
    })
    // console.log(this.hotel)
  }

  async submitBooking(){
    if(!this.isLoggedIn){
      this.router.navigate(['/login']);
    }
    console.log(this.authService.getUser())
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if(this.checkInDate < today){
      this.error = 'Check-in date cannot be in the past.';
      return;
    }
    if(this.checkOutDate < this.checkInDate){
      this.error = 'Check-out date cannot be before check-in date.';
      return;
    }
    this.isLoading = true;
    const bookingRequest: BookingRequest = {
      id: '',
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      totalRent: this.hotel.rentPerDay * (this.differenceInDays(this.checkInDate, this.checkOutDate) + 1),
      bookingStatus: BookingStatus.Pending,
      hotelId: this.hotel.id,
      userId: this.authService.getUser().id
    }
console.log(this.hotel)
    console.log(bookingRequest);
    const rowsAffected:number = await this.bookingService.createBooking(bookingRequest)
    if(rowsAffected === 1){
      this.notification.create(
        'success',
        'Success',
        'Your booking request has been submitted successfully',
      )
      this.router.navigate(['/home'])
    }
    console.log(rowsAffected)
    this.isLoading = false;
  }

  differenceInDays(date1: Date, date2: Date): number {
    // Convert both dates to UTC to ensure accurate calculation
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  
    // Calculate the difference in milliseconds
    const diffInMs = Math.abs(utc2 - utc1);
  
    // Convert the difference from milliseconds to days
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  }
}
