import { all, isEmpty as isEmptyArr, isSingle, nonNul, nonNulOrUnd, nonUnd, single, singleIf, toRec, toSet } from 'src/arrays';
import { defineAttributes, defineMethodsOrGetters } from 'src/defineProps';
import { entries, filterEntries, filterKeys, filterValues, fromEntries, isEmpty as isEmptyRec, mapEntries, mapKeys, mapValues } from 'src/records';
import { toArr } from 'src/sets';
import { isArr, isBool, isJson, isNul, isNulOrUnd, isNum, isRec, isSet, isStr, isUnd } from 'src/types';

let installed: boolean = false;

function installGlobals(): void {
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

installGlobals();

export { };