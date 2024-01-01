import kleur from 'kleur';

import { ErrorPayload, toErrPayload } from './errors';
import { isEmpty, toArr } from './objects';
import { isArr, isBool, isNul, isNum, isStr, isUnd, Num, RObj, Str } from './types';

export type Info = Str | Num | Bool | Nul | Und | { readonly [TK in Str]: Info } | readonly Info[];

const stripAnsiRegex = new RegExp([
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
].join('|'), 'g');

function formatStr(v: Str, maxLen: Num = 50): Str {
  const safeValue = v.replace(stripAnsiRegex, '').slice(0, maxLen)
    .replace(/[^A-Za-z0-9 _\-\\/\\[\\]\?!\*\+=\(\){}.,:;"'%&$€#@<>\|]+/g, colors[Color.infoValBadChar]('?'));
  return v.length > maxLen ? safeValue + colors[Color.infoValBadChar]('[…]') : safeValue;
}

enum FormatInfoMode {
  root, listItem, dictValue
}

function formatInfo(v: Info, mode: FormatInfoMode = FormatInfoMode.root): Str {
  if (isUnd(v)) {
    return '';
  }
  else if (isNul(v)) {
    return colors[Color.infoVal]('null');
  }
  else if (isNum(v)) {
    return colors[Color.infoVal](v.toLocaleString('fullwide', { maximumFractionDigits: 2, useGrouping: false }));
  }
  else if (isBool(v)) {
    return colors[Color.infoVal](v.toString());
  }
  else if (isArr(v)) {
    return v.length === 0
      ? '[]'
      : (mode === FormatInfoMode.dictValue ? '\n' : '') + v
        .filter(v => !isUnd(v))
        .map(v => indent(formatInfo(v, FormatInfoMode.listItem), mode === FormatInfoMode.dictValue ? '  - ' : '- '))
        .join('\n');
  }
  else if (isStr(v)) {
    const safeString = formatStr(v.toString(), 5000);
    const coloredSafeString = colors[Color.infoVal](safeString);
    return safeString.includes('\n') ? `\n${indent(coloredSafeString, '  \'')}'` : `'${coloredSafeString}'`;
  }
  else if (isObj(v)) {
    return isEmpty(v)
      ? '{}'
      : (mode === FormatInfoMode.dictValue ? '\n' : '') + toArr(v)
        .filter(([, v]) => !isUnd(v))
        .map(([k, v]) => indent(`${colors[Color.infoKey](formatStr(k.toString(), 50))}: ${formatInfo(v, FormatInfoMode.dictValue)}`, mode === FormatInfoMode.dictValue ? '  ' : ''))
        .join('\n');
  }
  return colors[Color.infoVal]('Unk');
}

function indent(text: Str, prefix: Str = ''): Str {
  const nextPrefix = ' '.repeat(prefix.length);
  return prefix + text.replaceAll('\n', '\n' + nextPrefix);
}

enum Color {
  err, errMsg, info, infoKey, infoVal, infoValBadChar, warn, done, debug,
}

const colors: RObj<Color, (text: Str) => Str> = {
  [Color.err]: kleur.red,
  [Color.errMsg]: kleur.red().bold,
  [Color.info]: kleur.gray,
  [Color.infoKey]: kleur.gray().bold,
  [Color.infoVal]: kleur.gray().italic,
  [Color.infoValBadChar]: kleur.yellow,
  [Color.warn]: kleur.yellow,
  [Color.done]: kleur.green,
  [Color.debug]: kleur.blue,
};

function prErrPayloadImpl(payload: ErrorPayload, depth: Num): void {
  const prefix = '  '.repeat(depth);
  const print = (text: Str): void => console.error(indent(text, prefix));
  print(colors[Color.errMsg](payload.message));
  prInfo(payload.info, print);
  if (payload.cause) {
    print(colors[Color.err]('Caused by:'));
    prErrPayloadImpl(payload.cause, depth + 1);
  }
}

export function prInfo(info: Info, log: (text: Str) => void = console.log): void {
  if (!isUnd(info)) {
    log(colors[Color.info](formatInfo(info)));
  }
}

export function prDebug(msg: Str, info?: Info): void {
  console.debug(colors[Color.debug](msg));
  prInfo(info, console.debug);
}

export function prErr(msg: Str, info?: Info): void {
  console.error(colors[Color.err](msg));
  prInfo(info, console.error);
}

export function prWarn(msg: Str, info?: Info): void {
  console.warn(colors[Color.warn](msg));
  prInfo(info, console.warn);
}

export function prDone(msg: Str, info?: Info): void {
  console.log(colors[Color.done](msg));
  prInfo(info, console.log);
}

export function prErrPayload(payload: ErrorPayload): void {
  prErrPayloadImpl(payload, 0);
}

export function prExc(exc: unknown, msg?: Str, info?: Und): void;
export function prExc(exc: unknown, msg: Str, info?: Info): void;
export function prExc(exc: unknown, msg?: Str, info?: Info): void {
  if (msg) {
    prErr(msg, info);
  }
  prErrPayload(toErrPayload(exc));
}
