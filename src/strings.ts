import type { Str } from './types';

export function stripStart(str: Str, prefix: Str): Str {
  return str.startsWith(prefix) ? str.slice(prefix.length) : str;
}

export function stripEnd(str: Str, suffix: Str): Str {
  return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;
}