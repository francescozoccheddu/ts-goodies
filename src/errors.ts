import { Info } from './logs';
import { R } from './types';

export type ErrorPayload = R<{
  message: Str;
  info: Info;
  cause: ErrorPayload | Nul;
}>;

export class ErrorWithPayload extends Error {

  readonly payload: ErrorPayload;

  constructor(payload: ErrorPayload) {
    super(payload.message, { cause: payload });
    this.payload = payload;
  }

}

export function cerrPayload(cause: ErrorPayload | Nul, msg: Str, info?: Info): ErrorPayload {
  return { message: msg, info: info, cause };
}

export function errPayload(msg: Str, info?: Info): ErrorPayload {
  return cerrPayload(null, msg, info);
}

export function toErrPayload(error: Unk): ErrorPayload {
  if (error instanceof ErrorWithPayload) {
    return error.payload;
  }
  else if (error instanceof Error) {
    return cerrPayload(
      error.cause ? toErrPayload(error.cause) : null,
      'Unknown error',
      {
        message: error.message,
        name: error.name,
        stack: error.stack,
      },
    );
  }
  else {
    return errPayload('Unknown error');
  }
}

export function cerr(cause: Unk, msg: Str, info?: Info): never {
  throw new ErrorWithPayload(cerrPayload(cause ? toErrPayload(cause) : null, msg, info));
}

export function err(msg: Str, info?: Info): never {
  cerr(null, msg, info);
}

export function orThrow<TRes>(run: () => TRes, msg: Str, info?: Info): TRes {
  try {
    return run();
  } catch (e) {
    cerr(e, msg, info);
  }
}

export async function orThrowAsync<TRes>(run: () => Promise<TRes>, msg: Str, info?: Info): Promise<TRes> {
  try {
    return await run();
  } catch (e) {
    cerr(e, msg, info);
  }
}