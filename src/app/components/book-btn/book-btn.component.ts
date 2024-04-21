import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-btn',
  standalone: true,
  imports: [CommonModule],
  template: `
  <button class="book-button" nz-button [ngStyle]="{'height.px':height,'width.px':width, 'border-radius.px':borderRadius }" nzType="primary">
  Book now
  </button>
  `,
  styles:`
  .book-button{
    cursor:pointer;
    background-color: var(--main-color);
    color: white;
    border:none;
    padding:0;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:15px;
    font-weight:medium;
  }
  `
  // styleUrl: './book-btn.component.css'
})
export class BookBtnComponent {
  @Input() height: number = 45;
  @Input() width: number = 125;
  @Input() borderRadius=5;
}
