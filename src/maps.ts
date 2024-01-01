import { Arr } from './types';

export function toArr<TK, TV>(arr: RMap<TK, TV>): Arr<REntry<TK, TV>> {
  return Array.from(arr);
}
