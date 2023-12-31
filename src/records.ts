// ----- Create / Get -----

import { AnyKey, Entries, Rec, REntries, REntry, RRec } from './types';

export function fromEntries<TKey extends AnyKey, TValue>(entries: REntries<TKey, TValue>): Rec<TKey, TValue> {
  return Object.fromEntries(entries) as RRec<TKey, TValue>;
}

export function entries<TKey extends AnyKey, TValue>(obj: RRec<TKey, TValue>): Entries<TKey, TValue> {
  return Object.entries(obj) as unknown as Entries<TKey, TValue>;
}

export function isEmpty<TKey extends AnyKey, TValue>(obj: RRec<TKey, TValue>): boolean {
  return Object.keys(obj).length === 0;
}

// ----- Map -----

export function mapEntries<TKey extends AnyKey, TValue, TOutKey extends AnyKey, TOutValue>(obj: RRec<TKey, TValue>, map: (key: TKey, value: TValue) => REntry<TOutKey, TOutValue>): Rec<TOutKey, TOutValue> {
  return fromEntries(entries(obj).map(([k, v]) => map(k, v)));
}

export function mapKeys<TKey extends AnyKey, TValue, TOutKey extends AnyKey>(obj: RRec<TKey, TValue>, map: (key: TKey, value: TValue) => TOutKey): Rec<TOutKey, TValue> {
  return mapEntries(obj, (k, v) => [map(k, v), v]);
}

export function mapValues<TKey extends AnyKey, TValue, TOutValue>(obj: RRec<TKey, TValue>, map: (value: TValue, key: TKey) => TOutValue): Rec<TKey, TOutValue> {
  return mapEntries(obj, (k, v) => [k, map(v, k)]);
}

// ----- Filter -----

export function filterEntries<TKey extends AnyKey, TValue>(obj: RRec<TKey, TValue>, pred: (key: TKey, value: TValue) => boolean): Rec<TKey, TValue> {
  return fromEntries(entries(obj).filter(([k, v]) => pred(k, v)));
}

export const filterKeys = filterEntries;

export function filterValues<TKey extends AnyKey, TValue>(obj: RRec<TKey, TValue>, pred: (value: TValue, key: TKey) => boolean): Rec<TKey, TValue> {
  return filterEntries(obj, (k, v) => pred(v, k));
}