import { Component, Input } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { BookBtnComponent } from '../book-btn/book-btn.component';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [
    NzFlexModule,
    NzDividerModule,
    BookBtnComponent
  ],
  templateUrl: './hotel-card.component.html',
  styleUrl: './hotel-card.component.css'
})
export class HotelCardComponent {
  @Input() name!: string;
  @Input() price!: number;
}
