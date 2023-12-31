import type {types } from '../index';

declare global {

  type R<T> = types.R<T>;

  // ----- types (primitives) -----

  type Str = types.Str;
  type Num = types.Num;
  type Bool = types.Bool;
  type Und = types.Und;
  type Nul = types.Nul;
  type Sym = types.Sym;
  type Unk = types.Unk;
  type BInt = types.BInt;
  type Prim = types.Prim;
  type Json = types.Json;
  type RJson = types.RJson;

  // ----- types (entries) -----

  type Entry<TKey, TValue> = types.Entry<TKey, TValue>;
  type REntry<TKey, TValue> = types.REntry<TKey, TValue>;

  type AnyEntry = types.AnyEntry;

  type Entries<TKey, TValue> = types.Entries<TKey, TValue>;
  type REntries<TKey, TValue> = types.REntries<TKey, TValue>;

  // ----- types (objects) -----

  type AnyKey = types.AnyKey;

  type Obj<TKey extends AnyKey = AnyKey, TValue = Unk> = types.Obj<TKey, TValue>;
  type RObj<TKey extends AnyKey = AnyKey, TValue = Unk> = types.RObj<TKey, TValue>;

  type AnyObj = types.AnyObj;

  type StrObj<TValue = Unk> = types.StrObj<TValue>;
  type RStrObj<TValue = Unk> = types.RStrObj<TValue>;

  // ----- types (arrays) -----

  type Arr<T> = types.Arr<T>;
  type RArr<T> = types.RArr<T>;

  type AnyArr = types.AnyArr;

  type ArrOrSingle<T> = types.ArrOrSingle<T>;
  type RArrOrSingle<T> = types.RArrOrSingle<T>;

  // ----- types (sets) -----

  type RSet<T> = types.RSet<T>;

  type AnySet = types.AnySet;

  // ----- types (maps) -----

  type RMap<TKey, TValue> = types.RMap<TKey, TValue>;

  type AnyMap = types.AnyMap;

  // ----- types (functions) -----

  type Pred<T> = types.Pred<T>;
  type MPred<TArgs extends AnyArr> = types.MPred<TArgs>;

  type AnyPred = types.AnyPred;
  type AnyMPred = types.AnyMPred;

}

export { };