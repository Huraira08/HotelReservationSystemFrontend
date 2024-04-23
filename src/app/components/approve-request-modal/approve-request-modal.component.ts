import { Component, EventEmitter, Inject, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { BookingService } from '../../services/booking/booking.service';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { HotelsService } from '../../services/hotels.service';
import { CommonModule } from '@angular/common';

export interface IApproveModalData{
  hotelId: string
  requestId: string
}

@Component({
  selector: 'app-approve-request-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,

    NzButtonComponent,
  ],
  // templateUrl: './approve-request-modal.component.html',
  template:`

  <!-- <h1>Assign a room no.</h1> -->
  <form [formGroup]="bookingForm" (ngSubmit)="allocate()">
    <div *ngIf="freeRooms">
      <label for="roomNo">Room No. </label>
      <select name="roomNo" id="roomNo"
      class="form-control" formControlName="roomNo"
      >
        <option *ngFor="let roomNo of freeRooms" >
            {{roomNo}}
        </option>
      </select>
    </div>
  </form>

  <div class="btn-container">
    <button (click)="allocate()" nz-button nzType="primary" [disabled]="bookingForm.invalid">Ok</button>
  </div>
  `,
  styleUrl: './approve-request-modal.component.css'
})
export class ApproveRequestModalComponent implements OnInit {
  bookingForm!: FormGroup;
  freeRooms!: number[];
  @Output() roomNoSelected = new EventEmitter<number>();

  readonly #modal = inject(NzModalRef);
  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private hotelService: HotelsService,
    @Inject(NZ_MODAL_DATA) public modalData: IApproveModalData,
  ){
    this.bookingForm = this.formBuilder.group({
      roomNo: ['', Validators.required]
    })
  }

  async ngOnInit() {
    try{
      this.freeRooms = await this.hotelService.getFreeRooms(this.modalData.hotelId, this.modalData.requestId);
    } catch(e){
      console.log(e)
    }
  }

  allocate(){
    if (this.bookingForm.valid) {
      const selectedRoomNo = this.bookingForm.get('roomNo')?.value;
      // this.roomNoSelected.emit(selectedRoomNo);
      this.#modal.destroy({roomNo: selectedRoomNo});
    }
  }
}
