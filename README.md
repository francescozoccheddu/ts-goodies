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
import { Num, Nul, RArr } from '@francescozoccheddu/ts-goodies/types';
import { nonNul } from '@francescozoccheddu/ts-goodies/arrays';

const numOrNul: RArr<Num | Nul> = [1, 2, null, 4];
const num: RArr<Num> = nonNul(numOrNul);
console.log(num);
```

### With global types:

Import `@francescozoccheddu/ts-goodies/globals/essentials` first:

```typescript
import '@francescozoccheddu/ts-goodies/globals/essentials';
import { nonNul } from '@francescozoccheddu/ts-goodies/arrays';

const numOrNul: RArr<Num | Nul> = [1, 2, null, 4];
const num: RArr<Num> = nonNul(numOrNul);
console.log(num);
```

### With global object augmentation:

Import `@francescozoccheddu/ts-goodies/globals/augmentations` first:

```typescript
import '@francescozoccheddu/ts-goodies/globals/augmentations';

const numOrNul: RArr<Num | Nul> = [1, 2, null, 4];
const num: RArr<Num> = numOrNul.nonNul;
console.log(num);
```

## Build

Run:

```shell
npm start
```