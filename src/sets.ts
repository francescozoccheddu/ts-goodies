
export function toArr<T>(arr: RSet<T>): Arr<T> {
  return Array.from(arr);
}
