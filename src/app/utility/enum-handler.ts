export function getEnumKeyValuePairs(enumObj: any): { text: string, value: any }[] {
    return Object.keys(enumObj).map(key => ({ text: enumObj[key], value: key }));
  }