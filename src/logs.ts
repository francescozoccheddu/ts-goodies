import kleur from 'kleur';

import { ErrorPayload, ErrorWithPayload } from './errors';
import { entries, isEmpty } from './records';
import { isArr, isBool, isNul, isNum, isRec, isStr, isUnd, Num, RJson, RRec, Str, StrRRec } from './types';

export type Info = StrRRec<RJson | undefined>;

const stripAnsiRegex = new RegExp([
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
].join('|'), 'g');

function formatStr(v: Str, maxLen: Num = 50): Str {
  const safeValue = v.replace(stripAnsiRegex, '').slice(0, maxLen)
    .replace(/[^A-Za-z0-9 _\-\\/\\[\\]\?!\*\+=\(\){}.,:;"'%&$€#@<>\|]+/g, colors[Color.infoValBadChar]('?'));
  return v.length > maxLen ? safeValue + colors[Color.infoValBadChar]('[…]') : safeValue;
}

enum FormatJsonMode {
  root, listItem, dictValue
}

function formatJson(v: RJson | Info, mode: FormatJsonMode = FormatJsonMode.root): Str {
  if (isNul(v)) {
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
      : (mode === FormatJsonMode.dictValue ? '\n' : '') + v
        .filter(v => !isUnd(v))
        .map(v => indent(formatJson(v, FormatJsonMode.listItem), mode === FormatJsonMode.dictValue ? '  - ' : '- '))
        .join('\n');
  }
  else if (isStr(v)) {
    const safeString = formatStr(v.toString(), 5000);
    const coloredSafeString = colors[Color.infoVal](safeString);
    return safeString.includes('\n') ? `\n${indent(coloredSafeString, '  \'')}'` : `'${coloredSafeString}'`;
  }
  else if (isRec(v)) {
    return isEmpty(v)
      ? '{}'
      : (mode === FormatJsonMode.dictValue ? '\n' : '') + entries(v)
        .filter(([, v]) => !isUnd(v))
        .map(([k, v]) => indent(`${colors[Color.infoKey](formatStr(k.toString(), 50))}: ${formatJson(v as RJson, FormatJsonMode.dictValue)}`, mode === FormatJsonMode.dictValue ? '  ' : ''))
        .join('\n');
  }
  return colors[Color.infoVal]('unknown');
}

function indent(text: Str, prefix: Str = ''): Str {
  const nextPrefix = ' '.repeat(prefix.length);
  return prefix + text.replaceAll('\n', '\n' + nextPrefix);
}

enum Color {
  meta, msg, info, infoKey, infoVal, infoValBadChar, warn, done
}

const colors: RRec<Color, (text: Str) => Str> = {
  [Color.meta]: kleur.red,
  [Color.msg]: kleur.red().bold,
  [Color.info]: kleur.gray,
  [Color.infoKey]: kleur.gray().bold,
  [Color.infoVal]: kleur.gray().italic,
  [Color.infoValBadChar]: kleur.yellow,
  [Color.warn]: kleur.yellow,
  [Color.done]: kleur.green,
};

function prErrPayloadImpl(payload: ErrorPayload, depth: Num): void {
  const prefix = '  '.repeat(depth);
  const print = (text: Str): void => console.error(indent(text, prefix));
  print(colors[Color.msg](payload.message));
  prInfo(payload.info, print);
  if (payload.cause) {
    print(colors[Color.meta]('Caused by:'));
    prErrPayloadImpl(payload.cause, depth + 1);
  }
}

export function prInfo(info: Info, log: (text: Str) => void = console.log): void {
  if (!isEmpty(info)) {
    log(colors[Color.info](formatJson(info)));
  }
}

export function prWarn(msg: Str, info: Info = {}): void {
  console.warn(colors[Color.warn](msg));
  prInfo(info, console.warn);
}

export function prDone(msg: Str, info: Info = {}): void {
  console.log(colors[Color.done](msg));
  prInfo(info);
}

export function prErrPayload(payload: ErrorPayload): void {
  prErrPayloadImpl(payload, 0);
}

export function prErr(err: ErrorWithPayload, msg: Str | null = null): void {
  if (msg) {
    console.error(colors[Color.meta](msg));
  }
  prErrPayload(err.payload);
}