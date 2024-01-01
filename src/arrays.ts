import { Dict } from './dicts';
import { err } from './errors';
import { fromArr } from './objects';
import { AnyKey, Arr, isArr, isNul, isNulOrUnd, isUnd, Nul, Obj, Pred, RArr, REntries, Und, Unk } from './types';

export const skip = Symbol();

export type Skip = typeof skip;

export function singleToArr<T>(arrOrSingle: T): T extends Arr<Unk> ? T : Arr<T> {
  return (isArr(arrOrSingle) ? arrOrSingle : [arrOrSingle]) as T extends Arr<Unk> ? T : Arr<T>;
}

export function all<T>(arr: RArr<T>, pred: Pred<T>): Bool {
  return !arr.some(v => !pred(v));
}

export function isEmpty<T>(arr: RArr<T>): Bool {
  return arr.length === 0;
}

export function isSingle<T>(arr: RArr<T>): Bool {
  return arr.length === 1;
}

export function isMany<T>(arr: RArr<T>): Bool {
  return arr.length > 1;
}

export function singleIf<T>(arr: RArr<T>, pred: Pred<T> | Nul = null): T {
  let index: Num = -1;
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

export function toObj<TK extends AnyKey, TV>(arr: REntries<TK, TV>): Obj<TK, TV> {
  return fromArr(arr);
}

export function toMap<TK, TV>(arr: REntries<TK, TV>): Map<TK, TV> {
  return new Map(arr);
}

export function toDict<TK, TV>(arr: REntries<TK, TV>): Dict<TK, TV> {
  return new Dict(arr);
}

export function fmap<T, TOut>(arr: RArr<T>, map: (v: T) => TOut | Skip): Arr<Exclude<TOut, Skip>> {
  return arr.map(map).filter(v => v !== skip) as Arr<Exclude<TOut, Skip>>;
}

export function nonNul<T>(arr: RArr<T | Nul>): Arr<Exclude<T, Nul>> {
  return arr.filter(v => !isNul(v)) as Arr<Exclude<T, Nul>>;
}

export function nonUnd<T>(arr: RArr<T | Und>): Arr<Exclude<T, Und>> {
  return arr.filter(v => !isUnd(v)) as Arr<Exclude<T, Und>>;
}

export function nonNulOrUnd<T>(arr: RArr<T | Nul | Und>): Arr<Exclude<T, Nul | Und>> {
  return arr.filter(v => !isNulOrUnd(v)) as Arr<Exclude<T, Nul | Und>>;
}

export function zip<T1, T2>(arr1: RArr<T1>, arr2: RArr<T2>): Arr<[T1, T2]> {
  if (arr1.length !== arr2.length) {
    err('Not the same length');
  }
  return arr1.map((v, i) => [v, arr2[i]!] as const);
}