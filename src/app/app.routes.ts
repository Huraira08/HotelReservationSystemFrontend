import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HotelDetailPageComponent } from './pages/hotel-detail-page/hotel-detail-page.component';

export const routes: Routes = [
    {path: '', redirectTo: "home", pathMatch: 'full'},
    {path: 'home', component: HomePageComponent},
    {path: 'hotel-detail', component: HotelDetailPageComponent}
];
