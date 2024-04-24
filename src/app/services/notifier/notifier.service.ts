import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { BookingRequest } from '../../models/booking-request';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  private hubConnection!: signalR.HubConnection;
  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7271/notifier') // SignalR hub URL
      .build();
   }

   startConnection(): Observable<void> {
    return new Observable<void>((observer) => {
      this.hubConnection
        .start()
        .then(() => {
          console.log('Connection established with SignalR hub');
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          console.error('Error connecting to SignalR hub:', error);
          observer.error(error);
        });
    });
  }

  receiveMessage(): Observable<any> {
    return new Observable<any>((observer) => {
      this.hubConnection.on('status', (message: any) => {
        observer.next(message);
      });
    });
  }
}
