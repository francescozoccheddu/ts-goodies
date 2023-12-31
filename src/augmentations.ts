import { all, isEmpty as isEmptyArr, isSingle, nonNul, nonNulOrUnd, nonUnd, single, singleIf, toRec, toSet } from './arrays';
import { entries, filterEntries, filterKeys, filterValues, fromEntries, isEmpty as isEmptyRec, mapEntries, mapKeys, mapValues } from './records';
import { toArr } from './sets';
import { AnyArr, AnySet, isArr, isBool, isJson, isNul, isNulOrUnd, isNum, isRec, isSet, isStr, isUnd, StrRRec } from './types';

export function defineMethodsOrGetters<TThis>(obj: unknown, props: StrRRec<(instance: TThis, ...args: any[]) => any>): void {
  Object.defineProperties(obj, mapValues(props, v => ({
    [v.length === 1 ? 'get' : 'value']: function (this: TThis, ...args: any[]): any { return v(this, ...args); },
  })));
}

export function defineAttributes(obj: unknown, props: StrRRec): void {
  Object.defineProperties(obj, mapValues(props, v => ({ value: v })));
}

let installed: boolean = false;

function installAugmentations(): void {
  if (installed) {
    return;
  }
  installed = true;

  defineMethodsOrGetters<AnyArr>(Array.prototype, {
    all,
    isEmpty: isEmptyArr,
    isSingle,
    singleIf,
    single,
    toSet,
    toRec: toRec as any,
    nonNul,
    nonUnd,
    nonNulOrUnd,
  });

  defineAttributes(globalThis, {
    fromEntries,
    entries,
    isEmptyRec,
    mapEntries,
    mapKeys,
    mapValues,
    filterEntries,
    filterKeys,
    filterValues,
  });

  defineMethodsOrGetters<AnySet>(Set.prototype, {
    toArr,
  });

  defineAttributes(globalThis, {
    isStr,
    isNum,
    isBool,
    isSet,
    isArr,
    isRec,
    isUnd,
    isNul,
    isNulOrUnd,
    isJson,
  });

}

installAugmentations();

export { };