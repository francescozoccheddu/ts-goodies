# ts-goodies

Random TypeScript utilities.

## Installation

Run:

```shell
npm i @francescozoccheddu/ts-goodies
```

## Usage

### Without global object pollution:

Use it like any other library:

```typescript
import { nonNul } from '@francescozoccheddu/ts-goodies/arrays';

const numOrNul: RArr<Num | Nul> = [1, 2, null, 4];
const num: RArr<Num> = nonNul(numOrNul);
console.log(num);
```

### With global object pollution:

Import `globals` first:

```typescript
import '@francescozoccheddu/ts-goodies/globals';
import { nonNul } from '@francescozoccheddu/ts-goodies/arrays';

installGlobals();
const numOrNul: RArr<Num | Nul> = [1, 2, null, 4];
const num: RArr<Num> = numOrNul.nonNul;
console.log(num);
```

Don't forget to to add the global types to `tsconfig.json`:
```json
{
  "compilerOptions": {
    // ...
    "types": [
      "@francescozoccheddu/ts-goodies/globalTypes.d.ts"
    ]
    // ...
  },
}
```

## Build

Run:

```shell
npm start
```