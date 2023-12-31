
import { mapValues } from 'src/records';

export function defineMethodsOrGetters<TThis>(obj: unknown, props: StrRRec<(instance: TThis, ...args: any[]) => any>): void {
  Object.defineProperties(obj, mapValues(props, v => ({
    [v.length === 1 ? 'get' : 'value']: function (this: TThis, ...args: any[]): any { return v(this, ...args); },
  })));
}

export function defineAttributes(obj: unknown, props: StrRRec): void {
  Object.defineProperties(obj, mapValues(props, v => ({ value: v })));
}