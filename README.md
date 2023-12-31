# ts-goodies

Random TypeScript utilities.

## Installation

Run:

```shell
npm i @francescozoccheddu/ts-goodies
```

## Usage

### Without global object pollution:

Add the global types to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "types": [
      "@francescozoccheddu/ts-goodies/index.d.ts",
    ]
  },
}
```

…and use it like any other library:

```typescript
import { nonNul } from '@francescozoccheddu/ts-goodies/arrays';

const numOrNul: RArr<Num | Nul> = [1, 2, null, 4];
const num: RArr<Num> = nonNul(numOrNul);
console.log(num);
```

### With global object pollution:

Add the global types to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "types": [
      "@francescozoccheddu/ts-goodies/index.d.ts",
      "@francescozoccheddu/ts-goodies/globalTypes.d.ts"
    ]
  },
}
```

…and import `globals`:

```typescript
import '@francescozoccheddu/ts-goodies/globals';

const numOrNul: RArr<Num | Nul> = [1, 2, null, 4];
const num: RArr<Num> = numOrNul.nonNul;
console.log(num);
```

## Build

Run:

```shell
npm start
```