import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookBtnComponent } from './book-btn.component';

describe('BookBtnComponent', () => {
  let component: BookBtnComponent;
  let fixture: ComponentFixture<BookBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
