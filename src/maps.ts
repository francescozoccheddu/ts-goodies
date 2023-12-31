import { Arr } from './types';

export function toArr<TKey, TValue>(arr: RMap<TKey, TValue>): Arr<REntry<TKey, TValue>> {
  return Array.from(arr);
}
