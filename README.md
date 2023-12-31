# ts-goodies

Random TypeScript utilities.

## Installation

Run:

```shell
npm i @francescozoccheddu/ts-goodies
```

## Usage

### Without any global pollution:

Use it like any other library:

```typescript
import { nonNul } from '@francescozoccheddu/ts-goodies/arrays';
import { Num, Nul, RArr } from '@francescozoccheddu/ts-goodies/types';

const numOrNul: RArr<Num | Nul> = [1, 2, null, 4];
const num: RArr<Num> = nonNul(numOrNul);
console.log(num);
```

### With global types:

Add the global types `ts-goodies/types/base` to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "types": [
      "@francescozoccheddu/ts-goodies/base"
    ]
  },
}
```

…and you can skip the type imports from `ts-goodies/types`:

```typescript
import { nonNul } from '@francescozoccheddu/ts-goodies/arrays';

const numOrNul: RArr<Num | Nul> = [1, 2, null, 4];
const num: RArr<Num> = nonNul(numOrNul);
console.log(num);
```

### With global object augmentation:

Add the global types `ts-goodies/types/augmented` to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "types": [
      "@francescozoccheddu/ts-goodies/augmented"
    ]
  },
}
```

…and import `ts-goodies/augmentations`:

```typescript
import '@francescozoccheddu/ts-goodies/augmentations';

const numOrNul: RArr<Num | Nul> = [1, 2, null, 4];
const num: RArr<Num> = numOrNul.nonNul;
console.log(num);
```

## Build

Run:

```shell
npm start
```