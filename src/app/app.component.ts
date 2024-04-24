import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { CommonModule } from '@angular/common';
import { BookBtnComponent } from './components/book-btn/book-btn.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { User } from './models/user';
import { AuthService } from './services/auth/auth.service';
import { NotifierService } from './services/notifier/notifier.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NzLayoutModule,
    NzFlexModule,
    NzButtonModule,
    BookBtnComponent,
    NzDropDownModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  showNavbar:boolean = false;
  isLoggedIn!: boolean;
  isAdmin!: boolean;
  user?: User;
  constructor(public router: Router,
    private authService: AuthService,
    private notifier: NotifierService,
    private notificationService: NzNotificationService
  ){}
  ngOnInit(): void {
    this.notifier.startConnection().subscribe(()=>{
      this.notifier.receiveMessage().subscribe(request=>{
        console.log(request, request.Id);
        if(request.BookingStatus == 1){
          this.notificationService.create('success','Booking Approved',`Your booking request ${request.Id} has been approved`)
        }else{
          this.notificationService.create('error','Booking Rejected',`Your booking request ${request.Id} has been rejected`)
        }
      })
    })
    this.authService.isLoggedIn().subscribe(
      {
        next:(isLoggedIn)=>{
          this.isLoggedIn = isLoggedIn;
          if(this.isLoggedIn){
            this.user = this.authService.getUser();
            this.isAdmin = this.authService.isAdmin();
            console.log(`isAdmin: ${this.isAdmin}`)
          }
        },
      }
    )
  }

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

  logout(){
    this.authService.logout()
    this.router.navigate(['/login']);
  }
}
