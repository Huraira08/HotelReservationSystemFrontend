import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRequestModalComponent } from './approve-request-modal.component';

describe('ApproveRequestModalComponent', () => {
  let component: ApproveRequestModalComponent;
  let fixture: ComponentFixture<ApproveRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveRequestModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproveRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
