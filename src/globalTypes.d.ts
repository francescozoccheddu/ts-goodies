export { };
declare global {

  // ----- Record -----

  function fromEntries<TKey extends AnyKey, TValue>(entries: REntries<TKey, TValue>): Rec<TKey, TValue>;
  function entries<TKey extends AnyKey, TValue>(obj: RRec<TKey, TValue>): Entries<TKey, TValue>;
  function isEmptyRec<TKey extends AnyKey, TValue>(obj: RRec<TKey, TValue>): boolean;
  function mapEntries<TKey extends AnyKey, TValue, TOutKey extends AnyKey, TOutValue>(obj: RRec<TKey, TValue>, map: (key: TKey, value: TValue) => REntry<TOutKey, TOutValue>): Rec<TOutKey, TOutValue>;
  function mapKeys<TKey extends AnyKey, TValue, TOutKey extends AnyKey>(obj: RRec<TKey, TValue>, map: (key: TKey, value: TValue) => TOutKey): Rec<TOutKey, TValue>;
  function mapValues<TKey extends AnyKey, TValue, TOutValue>(obj: RRec<TKey, TValue>, map: (value: TValue, key: TKey) => TOutValue): Rec<TKey, TOutValue>;
  function filterEntries<TKey extends AnyKey, TValue>(obj: RRec<TKey, TValue>, pred: (key: TKey, value: TValue) => boolean): Rec<TKey, TValue>;
  function filterKeys<TKey extends AnyKey, TValue>(obj: RRec<TKey, TValue>, pred: (key: TKey, value: TValue) => boolean): Rec<TKey, TValue>;
  function filterValues<TKey extends AnyKey, TValue>(obj: RRec<TKey, TValue>, pred: (value: TValue, key: TKey) => boolean): Rec<TKey, TValue>;

  // ----- Array -----

  type Skip = import('src/arrays').Skip

  interface Array<T> {
    all(pred: Pred<T>): boolean;
    get isEmpty(): Bool;
    get isSingle(): Bool;
    singleIf(pred: Pred<T>): T;
    get single(): T;
    get toSet(): Set<T>;
    get toRec(): T extends REntry<infer TKey, infer TValue> ? Rec<TKey, TValue> : never;
    fmap<TOut>(map: (v: T) => TOut | Skip): Arr<Exclude<TOut, Skip>>;
    get nonNul(): Arr<Exclude<T, Nul>>;
    get nonUnd(): Arr<Exclude<T, Und>>;
    get nonNulOrUnd(): Arr<Exclude<T, Nul | Und>>;
  }

  // ----- Set -----

  interface Set<T> {
    get toArr(): Arr<T>;
  }

  // ----- Guards -----

  function isStr(v: Unk): v is Str;
  function isNum(v: Unk): v is Num;
  function isBool(v: Unk): v is Bool;
  function isSet(v: Unk): v is AnySet;
  function isArr(v: Unk): v is AnyArr;
  function isRec(v: Unk): v is AnyRec;
  function isUnd(v: Unk): v is Und;
  function isNul(v: Unk): v is null;
  function isNulOrUnd(v: Unk): v is null | undefined;
  function isJson(v: Unk): v is RJson;

}
