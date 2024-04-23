import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Hotel } from '../models/hotel';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  hotelUrlText = 'hotels';
  constructor(private http: HttpClient){}

  getAll(){
    let promise = firstValueFrom(this.http.get<Hotel[]>(
      `${environment.apiPath}/${this.hotelUrlText}`
    ))
    return promise;
  }

  getFreeRooms(hotelId: string, bookingId: string){
    let promise = firstValueFrom(this.http.get<number[]>(
      `${environment.apiPath}/${this.hotelUrlText}/freeRooms/${hotelId}/${bookingId}`
    ))
    return promise;
  }
}
