import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HotelDetailPageComponent } from './pages/hotel-detail-page/hotel-detail-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { authGuard } from './guards/auth.guard';
import { MyBookingsPageComponent } from './pages/my-bookings-page/my-bookings-page.component';

export const routes: Routes = [
    {path: '', redirectTo: "login", pathMatch: 'full'},
    {path: 'home', component: HomePageComponent}, // accessible without login
    {path: 'hotel-detail', component: HotelDetailPageComponent, canActivate: [authGuard]},
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'my-bookings', component: MyBookingsPageComponent, canActivate: [authGuard]}
];
