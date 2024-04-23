import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { BookBtnComponent } from './components/book-btn/book-btn.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NzLayoutModule,
    NzFlexModule,
    NzButtonModule,
    BookBtnComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showNavbar:boolean = false;
  constructor(public router: Router){}

  toggleNavbar(component: Component){
    if(component instanceof LoginPageComponent || component instanceof RegisterPageComponent){
      this.showNavbar = false;
    }else{
      this.showNavbar = true;
    }
  }

  navToMyBooking(){
    this.router.navigate(['/my-bookings'])
  }
}
