// ----- Create / Get -----

import { AnyKey, Entries, Obj, REntries, REntry, RObj } from './types';

export function fromArr<TK extends AnyKey, TV>(entries: REntries<TK, TV>): Obj<TK, TV> {
  return Object.fromEntries(entries) as RObj<TK, TV>;
}

export function toArr<TK extends AnyKey, TV>(obj: RObj<TK, TV>): Entries<TK, TV> {
  return Object.entries(obj) as Unk as Entries<TK, TV>;
}

export function isEmpty<TK extends AnyKey, TV>(obj: RObj<TK, TV>): Bool {
  return Object.keys(obj).length === 0;
}

// ----- Map -----

export function mapEntries<TK extends AnyKey, TV, TK2 extends AnyKey, TV2>(obj: RObj<TK, TV>, map: (key: TK, value: TV) => REntry<TK2, TV2>): Obj<TK2, TV2> {
  return fromArr(toArr(obj).map(([k, v]) => map(k, v)));
}

export function mapKeys<TK extends AnyKey, TV, TK2 extends AnyKey>(obj: RObj<TK, TV>, map: (key: TK, value: TV) => TK2): Obj<TK2, TV> {
  return mapEntries(obj, (k, v) => [map(k, v), v]);
}

export function mapValues<TK extends AnyKey, TV, TV2>(obj: RObj<TK, TV>, map: (value: TV, key: TK) => TV2): Obj<TK, TV2> {
  return mapEntries(obj, (k, v) => [k, map(v, k)]);
}

// ----- Filter -----

export function filterEntries<TK extends AnyKey, TV>(obj: RObj<TK, TV>, pred: (key: TK, value: TV) => Bool): Obj<TK, TV> {
  return fromArr(toArr(obj).filter(([k, v]) => pred(k, v)));
}

export const filterKeys = filterEntries;

export function filterValues<TK extends AnyKey, TV>(obj: RObj<TK, TV>, pred: (value: TV, key: TK) => Bool): Obj<TK, TV> {
  return filterEntries(obj, (k, v) => pred(v, k));
}

export type FilterByEntryValue<TObj extends AnyObj, TV> = R<{
  [TK in keyof TObj as TObj[TK] extends TV ? TK : never]: TObj[TK]
}>