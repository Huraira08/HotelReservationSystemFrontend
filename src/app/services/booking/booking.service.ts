import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BookingRequest } from '../../models/booking-request';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  bookingUrlText = 'BookingRequest';
  constructor(private http: HttpClient) { }
  
  getAll(){
    let promise = firstValueFrom(this.http.get<BookingRequest[]>(
      `${environment.apiPath}/${this.bookingUrlText}`
      )
    )
    return promise;
  }

  get(id: string){
    let promise = firstValueFrom(this.http.get<BookingRequest>(
      `${environment.apiPath}/${this.bookingUrlText}/${id}`
      )
    )
    return promise;
  }

  getByUserId(userId: string){
    let promise = firstValueFrom(this.http.get<BookingRequest>(
      `${environment.apiPath}/${this.bookingUrlText}/UserRequests/${userId}`
      )
    )
    return promise;
  }

  createBooking(bookingRequest: BookingRequest){
    let promise = firstValueFrom(this.http.post<number>(
      `${environment.apiPath}/${this.bookingUrlText}`,
      bookingRequest
      ))
    return promise;
  }

  updateBooking(bookingRequest: BookingRequest){
    let promise = firstValueFrom(this.http.put<number>(
      `${environment.apiPath}/${this.bookingUrlText}/${bookingRequest.id}`,
      bookingRequest
      )
    )
    return promise;
  }

  deleteBooking(id: string){
    let promise = firstValueFrom(this.http.delete<number>(
      `${environment.apiPath}/${this.bookingUrlText}/${id}`
      )
    )
    return promise;
  }
}
