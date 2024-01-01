import type { types } from '../index';

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

  type Entry<TK, TV> = types.Entry<TK, TV>;
  type REntry<TK, TV> = types.REntry<TK, TV>;

  type AnyEntry = types.AnyEntry;

  type Entries<TK, TV> = types.Entries<TK, TV>;
  type REntries<TK, TV> = types.REntries<TK, TV>;

  // ----- types (objects) -----

  type AnyKey = types.AnyKey;

  type Obj<TK extends AnyKey = AnyKey, TV = Unk> = types.Obj<TK, TV>;
  type RObj<TK extends AnyKey = AnyKey, TV = Unk> = types.RObj<TK, TV>;

  type AnyObj = types.AnyObj;

  type StrObj<TV = Unk> = types.StrObj<TV>;
  type RStrObj<TV = Unk> = types.RStrObj<TV>;

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

  type RMap<TK, TV> = types.RMap<TK, TV>;

  type AnyMap = types.AnyMap;

  type StrMap<TV = Unk> = types.StrMap<TV>;
  type RStrMap<TV = Unk> = types.RStrMap<TV>;

  // ----- types (functions) -----

  type Pred<T> = types.Pred<T>;
  type MPred<TArgs extends AnyArr> = types.MPred<TArgs>;

  type AnyPred = types.AnyPred;
  type AnyMPred = types.AnyMPred;

}

export { };