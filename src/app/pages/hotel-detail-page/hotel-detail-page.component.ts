import { Component } from '@angular/core';
import { BookBtnComponent } from '../../components/book-btn/book-btn.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFlexModule, NzAlign } from 'ng-zorro-antd/flex';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { FacilityCardComponent } from '../../components/facility-card/facility-card.component';
import { CommonModule } from '@angular/common';

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
}
