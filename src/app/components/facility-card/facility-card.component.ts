import { Component, Input } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-facility-card',
  standalone: true,
  imports: [NzFlexModule],
  // templateUrl: './facility-card.component.html',
  // styleUrl: './facility-card.component.css'
  template:`
  <div class="facility-card-container" nz-flex nzJustify="center" nzAlign="center">
    <div class="facility-card-content">
      <img [src]="logoPath" alt="">
      <h5>{{facilityName}}</h5>
    </div>
  </div>
  `,
  styles:`
  .facility-card-container{
    height:220px;
    width:250px;
    background-color: var(--main-background-color);
  }

  .facility-card-container h5{
    color: var(--main-color);
    font-size: 20px;
    font-weight: 500;
    margin-top: 10px;
  }
  `
})
export class FacilityCardComponent {
@Input() facilityName!: string;
@Input() logoPath!: string;
}
