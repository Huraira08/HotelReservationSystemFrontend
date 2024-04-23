export enum BookingStatus{
    Pending,
    Approved,
    Rejected
}

export function StatusToNumber(gender: BookingStatus): number | null {
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

export function numberToStatus(num: number): string | null {
  switch (num) {
    case 0:
      return "Pending";
    case 1:
      return "Approved";
    case 2:
      return "Rejected";
    default:
      return null;
  }
}