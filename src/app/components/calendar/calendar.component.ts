import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

export interface ICalendarModalData{
  rangeStart: Date
  rangeEnd: Date
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    NzCalendarModule,
  ],
  // templateUrl: './calendar.component.html',
  template:`
  <ng-template #customDateCell let-date>
  <div [ngClass]="{'custom-highlight': isWithinRange(date)}">
    {{ date.getDate() }}
  </div>
</ng-template>
  <div [ngStyle]="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
      <nz-calendar 
      [nzFullscreen]="false" 
      [nzDateFullCell]="customDateCell"
      [nzValue]="modalData.rangeStart"
      >
      
    </nz-calendar>
    </div>

    <ng-template #customHeader>
      <div style="padding: 8px">
        <h4>Custom header</h4>
      </div>
    </ng-template>
  `,
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  rangeStart: Date = new Date(2024, 3, 10);
  rangeEnd: Date = new Date(2024, 3, 20);

  constructor(@Inject(NZ_MODAL_DATA) public modalData: ICalendarModalData){
    
  }
  ngOnInit(): void {
    // console.log(this.modalData.rangeStart)
    const start = new Date(this.modalData.rangeStart)
    const end = new Date(this.modalData.rangeEnd)
    if(this.modalData.rangeStart){
      console.log(start.getFullYear())
      this.rangeStart = new Date(start.getFullYear(), start.getMonth(), start.getDate())
      this.rangeEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate())
    }
  }

  disabledDate = (current: Date): boolean => {
    // Logic to disable dates
    return isWithinInterval(current, { start: startOfDay(this.rangeStart), end: endOfDay(this.rangeEnd) });
  };

  isWithinRange(date: Date): boolean {
    return isWithinInterval(date, { start: startOfDay(this.rangeStart), end: endOfDay(this.rangeEnd) });
  }

  // dateCellRenderer = (node: Date) => {
  //   if (this.isWithinRange(node)) {
  //     return { class: 'custom-highlight' };
  //   }
  //   return { class: 'custom-highlight' };
  // };
}
