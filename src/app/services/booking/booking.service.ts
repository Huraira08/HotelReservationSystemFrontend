import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BookingRequest } from '../../models/booking-request';
import { environment } from '../../environments/environment';
import { RequestAndAllocation } from '../../models/request-and-allocation';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  bookingUrlText = 'BookingRequest';
  private TOKEN_KEY = 'jwt_token';
  constructor(private http: HttpClient) { }

  getHeaderWithToken(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(this.TOKEN_KEY)}`
    });
    return {headers};
  }
  
  getAll(){
    let promise = firstValueFrom(this.http.get<BookingRequest[]>(
      `${environment.apiPath}/${this.bookingUrlText}`,
      this.getHeaderWithToken()
      )
    )
    return promise;
  }
  getRequestAllocations(){
    let promise = firstValueFrom(this.http.get<RequestAndAllocation[]>(
      `https://localhost:7271/api/BookingRequest/RequestAllocation`,
      this.getHeaderWithToken()
      )
    )
    return promise;
  }

  get(id: string){
    let promise = firstValueFrom(this.http.get<BookingRequest>(
      `${environment.apiPath}/${this.bookingUrlText}/${id}`,
      this.getHeaderWithToken()
      )
    )
    return promise;
  }

  getByUserId(userId: string){
    let promise = firstValueFrom(this.http.get<BookingRequest[]>(
      `${environment.apiPath}/${this.bookingUrlText}/UserRequests/${userId}`,
      this.getHeaderWithToken()
      )
    )
    return promise;
  }

  createBooking(bookingRequest: any){
    let promise = firstValueFrom(this.http.post<number>(
      `${environment.apiPath}/${this.bookingUrlText}`,
      bookingRequest,
      this.getHeaderWithToken()
      ))
    return promise;
  }

  allocateRoom(bookingId: string, roomNo: number){
    // `https://localhost:7271/api/BookingRequest/allocate/bookingId/roomNo`
    let promise = firstValueFrom(this.http.post<number>(
      `https://localhost:7271/api/BookingRequest/allocate/${bookingId}/${roomNo}`,
      {},
      this.getHeaderWithToken()
      ))
    return promise;
  }

  reject(bookingId: string){
    let promise = firstValueFrom(this.http.put<number>(
      `https://localhost:7271/api/BookingRequest/reject/${bookingId}`,
      {},
      this.getHeaderWithToken()
    ))
    return promise;
  }

  updateBooking(bookingRequest: BookingRequest){
    let promise = firstValueFrom(this.http.put<number>(
      `${environment.apiPath}/${this.bookingUrlText}/${bookingRequest.id}`,
      bookingRequest,
      this.getHeaderWithToken()
      )
    )
    return promise;
  }

  deleteBooking(id: string){
    let promise = firstValueFrom(this.http.delete<number>(
      `${environment.apiPath}/${this.bookingUrlText}/${id}`,
      this.getHeaderWithToken()
      )
    )
    return promise;
  }
}
