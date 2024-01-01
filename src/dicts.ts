import { isMap } from './types';

export interface RDict<TK, TV> {
  get length(): Num;
  has(key: TK): Bool;
  get(key: TK): TV | Und;
  getOrDef<T>(key: TK, or: T): TV | T;
  getOrDo<T>(key: TK, or: () => T): TV | T;
  get toArr(): Entries<TK, TV>;
  get entries(): IterableIterator<Entry<TK, TV>>;
  get values(): IterableIterator<TV>;
  get keys(): IterableIterator<TK>;
}

export class Dict<TK, TV> implements Dict<TK, TV> {

  private readonly map;

  constructor(values: REntries<TK, TV> | Map<TK, TV> = new Map()) {
    this.map = isMap(values) ? values : new Map(values);
  }

  getOrSet(key: TK, or: () => TV): TV {
    if (this.map.has(key)) {
      return this.map.get(key)!;
    }
    else {
      const value = or();
      this.map.set(key, value);
      return value;
    }
  }

  async getOrSetAsync(key: TK, or: () => Promise<TV>): Promise<TV> {
    if (this.map.has(key)) {
      return this.map.get(key)!;
    }
    else {
      const value = await or();
      this.map.set(key, value);
      return value;
    }
  }

  set(key: TK, value: TV, replace?: Bool | Und): Bool {
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

  remove(key: TK): Bool {
    return this.map.delete(key);
  }

  pop(key: TK): TV | Und {
    const value = this.map.get(key);
    this.map.delete(key);
    return value;
  }

  popOrDef<T>(key: TK, or: T): TV | T {
    const value = this.getOrDef(key, or);
    this.map.delete(key);
    return value;
  }

  popOrDo<T = TV>(key: TK, or: () => T): TV | T {
    const value = this.getOrDo(key, or);
    this.map.delete(key);
    return value;
  }

  get length(): Num {
    return this.map.size;
  }

  has(key: TK): Bool {
    return this.map.has(key);
  }

  get(key: TK): TV | Und {
    return this.map.get(key);
  }

  getOrDef<T>(key: TK, or: T): TV | T {
    return this.map.has(key) ? this.map.get(key)! : or;
  }

  getOrDo<T>(key: TK, or: () => T): TV | T {
    return this.map.has(key) ? this.map.get(key)! : or();
  }

  get toArr(): Entries<TK, TV> {
    return Array.from(this.entries);
  }

  get entries(): IterableIterator<Entry<TK, TV>> {
    return this.map.entries();
  }

  get values(): IterableIterator<TV> {
    return this.map.values();
  }

  get keys(): IterableIterator<TK> {
    return this.map.keys();
  }

}

export type StrDict<TV = Unk> = Dict<Str, TV>;
export type RStrDict<TV = Unk> = RDict<Str, TV>;

export type AnyDict = Dict<Unk, Unk>;

export function isDict(unk: Unk): unk is AnyDict {
  return unk instanceof Dict;
}