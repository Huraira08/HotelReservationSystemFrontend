export enum Gender{
    Male,
    Female,
    Other
}

export const genderLabels = ['Male', 'Female', 'Other']

export function genderToNumber(gender :string): number | null {
  switch (gender) {
    case 'Male':
      return 0;
    case 'Female':
      return 1;
    case 'Other':
      return 2;
    default:
      return null;
  }
}