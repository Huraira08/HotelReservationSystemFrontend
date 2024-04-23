import { BookingStatus } from "./booking-status";
import { Hotel } from "./hotel";
import { User } from "./user";

export interface BookingRequest {
    id: string,
    checkInDate: Date,
    checkOutDate: Date,
    totalRent: number,
    bookingStatus: BookingStatus,
    hotelId: string,
    hotel?: Hotel,
    userId: string,
    user?: User,
}
