// ----- Create / Get -----

import { AnyKey, Entries, Obj, REntries, REntry, RObj } from './types';

export function fromArr<TKey extends AnyKey, TValue>(entries: REntries<TKey, TValue>): Obj<TKey, TValue> {
  return Object.fromEntries(entries) as RObj<TKey, TValue>;
}

export function toArr<TKey extends AnyKey, TValue>(obj: RObj<TKey, TValue>): Entries<TKey, TValue> {
  return Object.entries(obj) as unknown as Entries<TKey, TValue>;
}

export function isEmpty<TKey extends AnyKey, TValue>(obj: RObj<TKey, TValue>): boolean {
  return Object.keys(obj).length === 0;
}

// ----- Map -----

export function mapEntries<TKey extends AnyKey, TValue, TOutKey extends AnyKey, TOutValue>(obj: RObj<TKey, TValue>, map: (key: TKey, value: TValue) => REntry<TOutKey, TOutValue>): Obj<TOutKey, TOutValue> {
  return fromArr(toArr(obj).map(([k, v]) => map(k, v)));
}

export function mapKeys<TKey extends AnyKey, TValue, TOutKey extends AnyKey>(obj: RObj<TKey, TValue>, map: (key: TKey, value: TValue) => TOutKey): Obj<TOutKey, TValue> {
  return mapEntries(obj, (k, v) => [map(k, v), v]);
}

export function mapValues<TKey extends AnyKey, TValue, TOutValue>(obj: RObj<TKey, TValue>, map: (value: TValue, key: TKey) => TOutValue): Obj<TKey, TOutValue> {
  return mapEntries(obj, (k, v) => [k, map(v, k)]);
}

// ----- Filter -----

export function filterEntries<TKey extends AnyKey, TValue>(obj: RObj<TKey, TValue>, pred: (key: TKey, value: TValue) => boolean): Obj<TKey, TValue> {
  return fromArr(toArr(obj).filter(([k, v]) => pred(k, v)));
}

export const filterKeys = filterEntries;

export function filterValues<TKey extends AnyKey, TValue>(obj: RObj<TKey, TValue>, pred: (value: TValue, key: TKey) => boolean): Obj<TKey, TValue> {
  return filterEntries(obj, (k, v) => pred(v, k));
}