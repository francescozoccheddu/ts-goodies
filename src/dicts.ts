import { isMap } from './types';

export interface RDict<TKey, TValue> {
  get length(): Num;
  has(key: TKey): Bool;
  get(key: TKey): TValue | Und;
  getOrDef<T>(key: TKey, or: T): TValue | T;
  getOrDo<T>(key: TKey, or: () => T): TValue | T;
  get toArr(): Entries<TKey, TValue>;
  get entries(): IterableIterator<Entry<TKey, TValue>>;
  get values(): IterableIterator<TValue>;
  get keys(): IterableIterator<TKey>;
}

export class Dict<TKey, TValue> implements Dict<TKey, TValue> {

  private readonly map;

  constructor(values: REntries<TKey, TValue> | Map<TKey, TValue>) {
    this.map = isMap(values) ? values : new Map(values);
  }

  getOrSet(key: TKey, or: () => TValue): TValue {
    if (this.map.has(key)) {
      return this.map.get(key)!;
    }
    else {
      const value = or();
      this.map.set(key, value);
      return value;
    }
  }

  set(key: TKey, value: TValue, replace?: Bool | Und): Bool {
    if (this.map.has(key)) {
      if (replace) {
        this.map.set(key, value);
      }
      return true;
    }
    else {
      this.map.set(key, value);
      return false;
    }
  }

  remove(key: TKey): Bool {
    return this.map.delete(key);
  }

  pop(key: TKey): TValue | Und {
    const value = this.map.get(key);
    this.map.delete(key);
    return value;
  }

  popOrDef<T>(key: TKey, or: T): TValue | T {
    const value = this.getOrDef(key, or);
    this.map.delete(key);
    return value;
  }

  popOrDo<T = TValue>(key: TKey, or: () => T): TValue | T {
    const value = this.getOrDo(key, or);
    this.map.delete(key);
    return value;
  }

  get length(): Num {
    return this.map.size;
  }

  has(key: TKey): Bool {
    return this.map.has(key);
  }

  get(key: TKey): TValue | Und {
    return this.map.get(key);
  }

  getOrDef<T>(key: TKey, or: T): TValue | T {
    return this.map.has(key) ? this.map.get(key)! : or;
  }

  getOrDo<T>(key: TKey, or: () => T): TValue | T {
    return this.map.has(key) ? this.map.get(key)! : or();
  }

  get toArr(): Entries<TKey, TValue> {
    return Array.from(this.entries);
  }

  get entries(): IterableIterator<Entry<TKey, TValue>> {
    return this.map.entries();
  }

  get values(): IterableIterator<TValue> {
    return this.map.values();
  }

  get keys(): IterableIterator<TKey> {
    return this.map.keys();
  }

}

export type AnyDict = Dict<Unk, Unk>;

export function isDict(unk: unknown): unk is AnyDict {
  return unk instanceof Dict;
}