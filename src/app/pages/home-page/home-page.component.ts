import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { NzFlexModule } from 'ng-zorro-antd/flex';
import { HotelCardComponent } from '../../components/hotel-card/hotel-card.component';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Router } from '@angular/router';
import { Hotel } from '../../models/hotel';
import { HotelsService } from '../../services/hotels.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    NzFlexModule,
    HotelCardComponent,
    NzGridModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
hotels:Hotel[] = []
@ViewChild('scrollTarget') scrollTarget!: ElementRef;

constructor(
  private router: Router,
  private hotelService: HotelsService
){}
  ngOnInit(): void {
    this.hotelService.getAll()
    .then(hotels =>this.hotels = hotels)
    .catch(err => console.log(err))
  }

  navToHotelDetail(hotel: Hotel){
    this.router.navigate(['/hotel-detail'], 
      {
        state: {
          hotel: hotel
        }
      }
    )
  }

  scrollDown() {
    this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
