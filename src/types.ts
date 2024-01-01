import { all } from './arrays';
import { toArr } from './objects';

export type R<T> = Readonly<T>;

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

export type Json = Str | Num | Bool | Nul | { [TK in Str]: Json } | Json[];
export type RJson = Str | Num | Bool | Nul | { readonly [TK in Str]: RJson } | readonly RJson[];

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

export function isMap(v: Unk): v is AnyMap {
  return v instanceof Map;
}

export function isArr(v: Unk): v is AnyArr {
  return Array.isArray(v);
}

export function isObj(v: Unk): v is AnyObj {
  return v === Object(v);
}

export function isUnd(v: Unk): v is Und {
  return typeof v === 'undefined';
}

export function isNul(v: Unk): v is Nul {
  return v === null;
}

export function isSym(v: Unk): v is Sym {
  return typeof v === 'symbol';
}

export function isNulOrUnd(v: Unk): v is Nul | Und {
  return isNul(v) || isUnd(v);
}

export function isJson(v: Unk): v is RJson {
  if (isNul(v)) return true;
  if (isBool(v)) return true;
  if (isNum(v)) return true;
  if (isStr(v)) return true;
  if (isArr(v)) return all(v, isJson);
  if (isObj(v)) return all(toArr(v), ([k, v]: any) => isStr(k) && isJson(v));
  return false;
}

// ----- Entries -----

export type Entry<TK, TV> = [key: TK, value: TV];
export type REntry<TK, TV> = R<Entry<TK, TV>>;

export type AnyEntry = REntry<Unk, Unk>;

export type Entries<TK, TV> = Arr<Entry<TK, TV>>;
export type REntries<TK, TV> = RArr<REntry<TK, TV>>;

// ----- Objects -----

export type AnyKey = keyof any;

export type Obj<TK extends AnyKey = AnyKey, TV = Unk> = Record<TK, TV>;
export type RObj<TK extends AnyKey = AnyKey, TV = Unk> = R<Obj<TK, TV>>;

export type AnyObj = RObj<AnyKey, Unk>;

export type StrObj<TV = Unk> = Obj<Str, TV>;
export type RStrObj<TV = Unk> = RObj<Str, TV>;

// ----- Arrays -----

export type Arr<T> = Array<T>;
export type RArr<T> = R<Arr<T>>;

export type AnyArr = RArr<Unk>;

export type ArrOrSingle<T> = T | Arr<T>;
export type RArrOrSingle<T> = T | RArr<T>;

// ----- Sets -----

export type RSet<T> = ReadonlySet<T>;

export type AnySet = RSet<Unk>;

// ----- Maps -----

export type RMap<TK, TV> = ReadonlyMap<TK, TV>;

export type AnyMap = RMap<Unk, Unk>;

export type StrMap<TV=Unk> = Map<Str, TV>;
export type RStrMap<TV=Unk> = RMap<Str, TV>;

// ----- Functions -----

export type Pred<T> = (arg: T) => Bool;
export type MPred<TArgs extends AnyArr> = (...args: TArgs) => Bool;

export type AnyPred = Pred<any>;
export type AnyMPred = MPred<any[]>;
