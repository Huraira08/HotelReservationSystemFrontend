import { Allocation } from "./allocation";
import { BookingRequest } from "./booking-request";

export interface RequestAndAllocation {
    bookingRequest: BookingRequest,
    allocation?: Allocation
}
