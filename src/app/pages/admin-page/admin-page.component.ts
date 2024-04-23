import { Component } from '@angular/core';
import { BookingRequest } from '../../models/booking-request';
import { BookingService } from '../../services/booking/booking.service';
import { CommonModule } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

import { numberToStatus } from '../../models/booking-status';
import { ApproveRequestModalComponent } from '../../components/approve-request-modal/approve-request-modal.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    NzDividerComponent,
    NzTableModule,
    NzPopconfirmModule,
    NzModalModule,
    CommonModule
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  requests: BookingRequest[] = [];
  currentPageRequests: readonly BookingRequest[] = []

  constructor(
    private bookingService: BookingService,
    private modalService: NzModalService
  ){
  }

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(){
    this.bookingService.getAll()
     .then(requests => {this.requests = requests})
     .catch(err => console.log(err));
  }

  approve(requestId: string, hotelId: string){
    const modal = this.modalService.create({
      nzTitle: 'Assign a room no.',
      nzContent: ApproveRequestModalComponent,
      nzData:{
        requestId: requestId,
        hotelId: hotelId
      },
      nzWidth: "716px",
      nzStyle:{'top': '10px'},
      nzFooter:null,
    })

    modal.afterClose.subscribe(result => {
      console.log(result['roomNo'])
      const roomNo = result['roomNo'];
      this.bookingService.allocateRoom(requestId, roomNo)
      .then(rows=>{console.log(rows); this.fetchBookings()})
      .catch(err=>console.log(err))
    })
  }

  reject(id: string){
    console.log('reject :', id)
  }

  onCurrentPageDataChange($event: readonly BookingRequest[]){
    this.currentPageRequests = $event;
  }

  // Utility functions
  numberToStatus(num: number): string{
    return numberToStatus(num)!;
  }

  getDate(date: Date){
    date = new Date(date);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
  
  truncateText(text: string){
    if(text.length > 20){
      return text.substring(0, 10) + '...';
    }
    return text;
  }
}
