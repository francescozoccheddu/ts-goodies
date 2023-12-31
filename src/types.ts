import { all } from 'src/arrays';
import { entries } from 'src/records';

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
  if (isRec(v)) return all(entries(v), ([k, v]) => isStr(k) && isJson(v));
  return false;
}
