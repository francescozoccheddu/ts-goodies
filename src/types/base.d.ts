export { };
declare global {

  type R<T> = Readonly<T>

  // ----- Primitives -----

  type Str = string;

  type Num = number;

  type Bool = boolean;

  type Und = undefined;

  type Nul = null;

  type Sym = symbol;

  type Unk = unknown;

  type BInt = bigint;

  type Prim = Str | Num | Bool | Sym | BInt | Nul | Und;

  type Json = Str | Num | Bool | Nul | { [key in Str]: Json } | Json[];
  type RJson = Str | Num | Bool | Nul | { [key in Str]: RJson } | RJson[];

  // ----- Record -----

  type AnyKey = keyof any

  type Rec<TKey extends AnyKey = AnyKey, TValue = Unk> = Record<TKey, TValue>;
  type RRec<TKey extends AnyKey = AnyKey, TValue = Unk> = R<Rec<TKey, TValue>>

  type AnyRec<TValue = Unk> = RRec<AnyKey, TValue>

  type StrRec<TValue = Unk> = Rec<Str, TValue>
  type StrRRec<TValue = Unk> = RRec<Str, TValue>

  type Entry<TKey extends AnyKey, TValue> = [key: TKey, value: TValue]
  type REntry<TKey extends AnyKey, TValue> = R<Entry<TKey, TValue>>

  type AnyEntry = Entry<AnyKey, Unk>;
  type AnyREntry = REntry<AnyKey, Unk>;

  type Entries<TKey extends AnyKey, TValue> = Arr<Entry<TKey, TValue>>
  type REntries<TKey extends AnyKey, TValue> = RArr<REntry<TKey, TValue>>

  // ----- Array -----

  type Arr<T> = T[]
  type RArr<T> = R<Arr<T>>

  type AnyArr = RArr<Unk>

  type ArrOrSingle<T> = T | Arr<T>
  type RArrOrSingle<T> = T | RArr<T>

  // ----- Set -----

  type RSet<T> = ReadonlySet<T>;

  type AnySet = RSet<Unk>;

  // ----- Function -----

  type Pred<T> = (arg: T) => Bool;
  type MPred<TArgs extends AnyArr> = (...args: TArgs) => Bool;

  type AnyPred = Pred<any>;
  type AnyMPred = MPred<any[]>;

}