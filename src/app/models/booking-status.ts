export enum BookingStatus{
    Pending = "Pending",
    Approved = "Approved",
    Rejected = "Rejected"
}

function genderToNumber(gender: BookingStatus): number | null {
    switch (gender) {
      case BookingStatus.Pending:
        return 0;
      case BookingStatus.Approved:
        return 1;
      case BookingStatus.Rejected:
        return 2;
      default:
        return null;
    }
}