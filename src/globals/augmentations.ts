import './essentials';

import type { Skip } from '../arrays';
import { arrays, dicts, objects, sets, types } from '../index';
import type { Info } from '../logs';

const getterDescriptor: PropertyDescriptor = {
  enumerable: false,
  configurable: false,
};

const valueDescriptor: PropertyDescriptor = {
  enumerable: false,
  writable: false,
  configurable: false,
};

function defineMethodsOrGetters<TThis>(obj: unknown, props: RStrObj<(instance: TThis, ...args: any[]) => any>): void {
  Object.defineProperties(obj, objects.mapValues(props, v => ({
    ...(v.length === 1 ? getterDescriptor : valueDescriptor),
    [v.length === 1 ? 'get' : 'value']: function (this: TThis, ...args: any[]): any { return v(this, ...args); },
  })));
}

function defineAttributes(obj: unknown, props: RStrObj): void {
  Object.defineProperties(obj, objects.mapValues(props, v => ({
    ...valueDescriptor,
    value: v,
  })));
}

let installed: boolean = false;

function installAugmentations(): void {
  if (installed) {
    return;
  }
  installed = true;

  defineMethodsOrGetters<AnyArr>(Array.prototype, {
    all: arrays.all,
    isEmpty: arrays.isEmpty,
    isSingle: arrays.isSingle,
    singleIf: arrays.singleIf,
    single: arrays.single,
    toSet: arrays.toSet,
    toObj: arrays.toObj as any,
    toMap: arrays.toMap as any,
    toDict: arrays.toDict as any,
    nonNul: arrays.nonNul,
    nonUnd: arrays.nonUnd,
    nonNulOrUnd: arrays.nonNulOrUnd,
  });

  defineAttributes(globalThis, {
    fromEntries: objects.fromArr,
    entries: objects.toArr,
    isEmptyRec: objects.isEmpty,
    mapEntries: objects.mapEntries,
    mapKeys: objects.mapKeys,
    mapValues: objects.mapValues,
    filterEntries: objects.filterEntries,
    filterKeys: objects.filterKeys,
    filterValues: objects.filterValues,
  });

  defineMethodsOrGetters<AnySet>(Set.prototype, {
    toArr: sets.toArr,
  });

  defineAttributes(globalThis, {
    isStr: types.isStr,
    isNum: types.isNum,
    isBool: types.isBool,
    isSet: types.isSet,
    isMap: types.isMap,
    isDict: dicts.isDict,
    isArr: types.isArr,
    isObj: types.isObj,
    isUnd: types.isUnd,
    isNul: types.isNul,
    isNulOrUnd: types.isNulOrUnd,
    isJson: types.isJson,
  });

}

installAugmentations();

interface ArrayAugmentations<T> {
  all(pred: Pred<T>): boolean;
  get isEmpty(): Bool;
  get isSingle(): Bool;
  singleIf(pred: Pred<T>): T;
  get single(): T;
  get toSet(): Set<T>;
  get toObj(): T extends REntry<infer TKey extends AnyKey, infer TValue> ? Obj<TKey, TValue> : never;
  get toMap(): T extends REntry<infer TKey, infer TValue> ? Map<TKey, TValue> : never;
  get toDict(): T extends REntry<infer TKey, infer TValue> ? Dict<TKey, TValue> : never;
  fmap<TOut>(map: (v: T) => TOut | Skip): Arr<Exclude<TOut, Skip>>;
  get nonNul(): Arr<Exclude<T, Nul>>;
  get nonUnd(): Arr<Exclude<T, Und>>;
  get nonNulOrUnd(): Arr<Exclude<T, Nul | Und>>;
}

interface SetAugmentations<T> {
  get toArr(): Arr<T>;
}

declare global {

  // ----- types -----

  function isStr(v: Unk): v is Str;
  function isNum(v: Unk): v is Num;
  function isBool(v: Unk): v is Bool;
  function isSet(v: Unk): v is AnySet;
  function isMap(v: Unk): v is AnyMap;
  function isDict(v: Unk): v is AnyDict;
  function isArr(v: Unk): v is AnyArr;
  function isObj(v: Unk): v is AnyObj;
  function isUnd(v: Unk): v is Und;
  function isNul(v: Unk): v is null;
  function isNulOrUnd(v: Unk): v is null | undefined;
  function isJson(v: Unk): v is RJson;

  // ----- objects -----

  function objFromArr<TKey extends AnyKey, TValue>(entries: REntries<TKey, TValue>): Obj<TKey, TValue>;
  function objToArr<TKey extends AnyKey, TValue>(obj: RObj<TKey, TValue>): Entries<TKey, TValue>;
  function isEmptyObj<TKey extends AnyKey, TValue>(obj: RObj<TKey, TValue>): boolean;
  function mapEntries<TKey extends AnyKey, TValue, TOutKey extends AnyKey, TOutValue>(obj: RObj<TKey, TValue>, map: (key: TKey, value: TValue) => REntry<TOutKey, TOutValue>): Obj<TOutKey, TOutValue>;
  function mapKeys<TKey extends AnyKey, TValue, TOutKey extends AnyKey>(obj: RObj<TKey, TValue>, map: (key: TKey, value: TValue) => TOutKey): Obj<TOutKey, TValue>;
  function mapValues<TKey extends AnyKey, TValue, TOutValue>(obj: RObj<TKey, TValue>, map: (value: TValue, key: TKey) => TOutValue): Obj<TKey, TOutValue>;
  function filterEntries<TKey extends AnyKey, TValue>(obj: RObj<TKey, TValue>, pred: (key: TKey, value: TValue) => boolean): Obj<TKey, TValue>;
  function filterKeys<TKey extends AnyKey, TValue>(obj: RObj<TKey, TValue>, pred: (key: TKey, value: TValue) => boolean): Obj<TKey, TValue>;
  function filterValues<TKey extends AnyKey, TValue>(obj: RObj<TKey, TValue>, pred: (value: TValue, key: TKey) => boolean): Obj<TKey, TValue>;

  // ----- arrays -----

  interface Array<T> extends ArrayAugmentations<T> { }
  interface ReadonlyArray<T> extends ArrayAugmentations<T> { }

  // ----- sets -----

  interface Set<T> extends SetAugmentations<T> { }
  interface ReadonlySet<T> extends SetAugmentations<T> { }

  // ----- dicts -----

  class Dict<TK, TV> extends dicts.Dict<TK, TV> {}
  type RDict<TK, TV> = dicts.RDict<TK, TV>;

  type AnyDict = dicts.AnyDict;

  // ----- errors -----

  function err(msg: string, info?: Info): never;

}

export { };