import { all } from './arrays';
import { entries } from './records';

export type R<T> = Readonly<T>

// ----- Primitives -----

export type Str = string;

export type Num = number;

export type Bool = boolean;

export type Und = undefined;

export type Nul = null;

export type Sym = symbol;

export type Unk = unknown;

export type BInt = bigint;

export type Prim = Str | Num | Bool | Sym | BInt | Nul | Und;

export type Json = Str | Num | Bool | Nul | { [key in Str]: Json } | Json[];
export type RJson = Str | Num | Bool | Nul | { [key in Str]: RJson } | RJson[];

export function isStr(v: Unk): v is Str {
  return typeof v === 'string' || v instanceof String;
}

export function isNum(v: Unk): v is Num {
  return typeof v === 'number';
}

export function isBool(v: Unk): v is Bool {
  return typeof v === 'boolean';
}

export function isSet(v: Unk): v is AnySet {
  return v instanceof Set;
}

export function isArr(v: Unk): v is AnyArr {
  return Array.isArray(v);
}

export function isRec(v: Unk): v is AnyRec {
  return v === Object(v);
}

export function isUnd(v: Unk): v is Und {
  return typeof v === 'undefined';
}

export function isNul(v: Unk): v is null {
  return v === null;
}

export function isSym(v: Unk): v is Sym {
  return typeof v === 'symbol';
}

export function isNulOrUnd(v: Unk): v is null | undefined {
  return isNul(v) || isUnd(v);
}

export function isJson(v: Unk): v is RJson {
  if (isNul(v)) return true;
  if (isBool(v)) return true;
  if (isNum(v)) return true;
  if (isStr(v)) return true;
  if (isArr(v)) return all(v, isJson);
  if (isRec(v)) return all(entries(v), ([k, v]: any) => isStr(k) && isJson(v));
  return false;
}

// ----- Record -----

export type AnyKey = keyof any

export type Rec<TKey extends AnyKey = AnyKey, TValue = Unk> = Record<TKey, TValue>;
export type RRec<TKey extends AnyKey = AnyKey, TValue = Unk> = R<Rec<TKey, TValue>>

export type AnyRec<TValue = Unk> = RRec<AnyKey, TValue>

export type StrRec<TValue = Unk> = Rec<Str, TValue>
export type StrRRec<TValue = Unk> = RRec<Str, TValue>

export type Entry<TKey extends AnyKey, TValue> = [key: TKey, value: TValue]
export type REntry<TKey extends AnyKey, TValue> = R<Entry<TKey, TValue>>

export type AnyEntry = Entry<AnyKey, Unk>;
export type AnyREntry = REntry<AnyKey, Unk>;

export type Entries<TKey extends AnyKey, TValue> = Arr<Entry<TKey, TValue>>
export type REntries<TKey extends AnyKey, TValue> = RArr<REntry<TKey, TValue>>

// ----- Array -----

export type Arr<T> = T[]
export type RArr<T> = R<Arr<T>>

export type AnyArr = RArr<Unk>

export type ArrOrSingle<T> = T | Arr<T>
export type RArrOrSingle<T> = T | RArr<T>

// ----- Set -----

export type RSet<T> = ReadonlySet<T>;

export type AnySet = RSet<Unk>;

// ----- Function -----

export type Pred<T> = (arg: T) => Bool;
export type MPred<TArgs extends AnyArr> = (...args: TArgs) => Bool;

export type AnyPred = Pred<any>;
export type AnyMPred = MPred<any[]>;
