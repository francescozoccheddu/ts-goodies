import { err } from './error';
import { fromEntries } from './records';
import { isArr, isNul, isNulOrUnd, isUnd } from './types';

export const skip = Symbol();

export type Skip = typeof skip;

export function singleToArr<T>(arrOrSingle: T): T extends Arr<Unk> ? T : Arr<T> {
  return (isArr(arrOrSingle) ? arrOrSingle : [arrOrSingle]) as T extends Arr<Unk> ? T : Arr<T>;
}

export function all<T>(arr: RArr<T>, pred: Pred<T>): boolean {
  return !arr.some(v => !pred(v));
}

export function isEmpty<T>(arr: RArr<T>): boolean {
  return arr.length === 0;
}

export function isSingle<T>(arr: RArr<T>): boolean {
  return arr.length === 1;
}

export function singleIf<T>(arr: RArr<T>, pred: Pred<T> | null = null): T {
  let index: number = -1;
  arr.forEach((v, i) => {
    if (pred?.(v) ?? true) {
      if (index >= 0) {
        err('Multiple found');
      }
      index = i;
    }
  });
  err('None found');
}

export function single<T>(arr: RArr<T>): T {
  if (isEmpty(arr)) {
    err('None found');
  }
  if (!isSingle(arr)) {
    err('Multiple found');
  }
  return arr[0]!;
}

export function toSet<T>(arr: RArr<T>): Set<T> {
  return new Set(arr);
}

export function toRec<TKey extends AnyKey, TValue>(arr: REntries<TKey, TValue>): Rec<TKey, TValue> {
  return fromEntries(arr);
}

export function fmap<T, TOut>(arr: RArr<T>, map: (v: T) => TOut | Skip): Arr<Exclude<TOut, Skip>> {
  return arr.map(map).filter(v => v !== skip) as Arr<Exclude<TOut, Skip>>;
}

export function nonNul<T>(arr: RArr<T | Nul>): Arr<Exclude<T, Nul>> {
  return arr.filter(v => !isNul(v)) as Arr<Exclude<T, null>>;
}

export function nonUnd<T>(arr: RArr<T | Und>): Arr<Exclude<T, Und>> {
  return arr.filter(v => !isUnd(v)) as Arr<Exclude<T, Und>>;
}

export function nonNulOrUnd<T>(arr: RArr<T | Nul | Und>): Arr<Exclude<T, Nul | Und>> {
  return arr.filter(v => !isNulOrUnd(v)) as Arr<Exclude<T, Nul | Und>>;
}