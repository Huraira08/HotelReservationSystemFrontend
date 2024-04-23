export enum Role{
    Customer,
    Admin
}

function genderToNumber(gender: Role): number | null {
    switch (gender) {
      case Role.Customer:
        return 0;
      case Role.Admin:
        return 1;
      default:
        return null;
    }
}