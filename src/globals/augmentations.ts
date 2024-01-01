import './essentials';

import type { Skip } from '../arrays';
import { arrays, dicts, errors, objects, sets, types } from '../index';
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

function defineMethodsOrGetters<TThis>(obj: Unk, props: RStrObj<(instance: TThis, ...args: any[]) => any>): void {
  Object.defineProperties(obj, objects.mapValues(props, v => ({
    ...(v.length === 1 ? getterDescriptor : valueDescriptor),
    [v.length === 1 ? 'get' : 'value']: function (this: TThis, ...args: any[]): any { return v(this, ...args); },
  })));
}

function defineAttributes(obj: Unk, props: RStrObj): void {
  Object.defineProperties(obj, objects.mapValues(props, v => ({
    ...valueDescriptor,
    value: v,
  })));
}

let installed: Bool = false;

function installAugmentations(): void {
  if (installed) {
    return;
  }
  installed = true;

  defineMethodsOrGetters<AnyArr>(Array.prototype, {
    all: arrays.all,
    isEmpty: arrays.isEmpty,
    isSingle: arrays.isSingle,
    isMany: arrays.isMany,
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

  defineAttributes(globalThis, {
    err: errors.err,
  });

}

installAugmentations();

interface ArrayAugmentations<T> {
  all(pred: Pred<T>): Bool;
  get isEmpty(): Bool;
  get isSingle(): Bool;
  get isMany(): Bool;
  singleIf(pred: Pred<T>): T;
  get single(): T;
  get toSet(): Set<T>;
  get toObj(): T extends REntry<infer TK extends AnyKey, infer TV> ? Obj<TK, TV> : never;
  get toMap(): T extends REntry<infer TK, infer TV> ? Map<TK, TV> : never;
  get toDict(): T extends REntry<infer TK, infer TV> ? Dict<TK, TV> : never;
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
  function isNul(v: Unk): v is Nul;
  function isNulOrUnd(v: Unk): v is Nul | Und;
  function isJson(v: Unk): v is RJson;

  // ----- objects -----

  function objFromArr<TK extends AnyKey, TV>(entries: REntries<TK, TV>): Obj<TK, TV>;
  function objToArr<TK extends AnyKey, TV>(obj: RObj<TK, TV>): Entries<TK, TV>;
  function isEmptyObj<TK extends AnyKey, TV>(obj: RObj<TK, TV>): Bool;
  function mapEntries<TK extends AnyKey, TV, TK2 extends AnyKey, TV2>(obj: RObj<TK, TV>, map: (key: TK, value: TV) => REntry<TK2, TV2>): Obj<TK2, TV2>;
  function mapKeys<TK extends AnyKey, TV, TK2 extends AnyKey>(obj: RObj<TK, TV>, map: (key: TK, value: TV) => TK2): Obj<TK2, TV>;
  function mapValues<TK extends AnyKey, TV, TV2>(obj: RObj<TK, TV>, map: (value: TV, key: TK) => TV2): Obj<TK, TV2>;
  function filterEntries<TK extends AnyKey, TV>(obj: RObj<TK, TV>, pred: (key: TK, value: TV) => Bool): Obj<TK, TV>;
  function filterKeys<TK extends AnyKey, TV>(obj: RObj<TK, TV>, pred: (key: TK, value: TV) => Bool): Obj<TK, TV>;
  function filterValues<TK extends AnyKey, TV>(obj: RObj<TK, TV>, pred: (value: TV, key: TK) => Bool): Obj<TK, TV>;

  // ----- arrays -----

  interface Array<T> extends ArrayAugmentations<T> { }
  interface ReadonlyArray<T> extends ArrayAugmentations<T> { }

  // ----- sets -----

  interface Set<T> extends SetAugmentations<T> { }
  interface ReadonlySet<T> extends SetAugmentations<T> { }

  // ----- dicts -----

  class Dict<TK, TV> extends dicts.Dict<TK, TV> { }
  type RDict<TK, TV> = dicts.RDict<TK, TV>;

  type AnyDict = dicts.AnyDict;

  type StrDict<TV = Unk> = dicts.StrDict<TV>;
  type RStrDict<TV = Unk> = dicts.RStrDict<TV>;

  // ----- errors -----

  function err(msg: Str, info?: Info): never;

}

export { };