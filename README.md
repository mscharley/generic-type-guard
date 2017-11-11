# generic-type-guard

[![npm version](https://badge.fury.io/js/generic-type-guard.svg)](https://badge.fury.io/js/generic-type-guard)
[![CircleCI](https://circleci.com/gh/mscharley/generic-type-guard.svg?style=svg)](https://circleci.com/gh/mscharley/generic-type-guard)

**Source:** [https://github.com/mscharley/generic-type-guard](https://github.com/mscharley/generic-type-guard)  
**Author:** Matthew Scharley  
**Contributors:** [See contributors on GitHub][gh-contrib]  
**Bugs/Support:** [Github Issues][gh-issues]  
**Copyright:** 2017  
**License:** [MIT license][license]  
**Status:** Active

## Synopsis

This library is an attempt to manage creating type guards in a sensible way, making them 
composable and reusable.

## Installation

    $ npm i generic-type-guard

## Usage

```typescript
import { 
  PartialTypeGuard, 
  TypeGuard, 
  hasAttribute, 
  isNumber, 
  isObject, 
  isString, 
} from "generic-type-guard";

export interface TestInterface {
  str: string;
  num: number;
}

const isTypeSafeTestInterface: tg.PartialTypeGuard<{}, TestInterface> =
  tg.isIntersection(tg.hasProperty("str", tg.isString), tg.hasProperty("num", tg.isNumber));

export const isTestInterface: TypeGuard<TestInterface> = (o: any): o is TestInterface =>
  isObject(o) && isTypeSafeTestInterface(o);
```

[There are more examples available.][example-usage]

  [gh-contrib]: https://github.com/mscharley/generic-type-guard/graphs/contributors
  [gh-issues]: https://github.com/mscharley/generic-type-guard/issues
  [license]: https://github.com/mscharley/generic-type-guard/blob/master/LICENSE
  [example-usage]: https://github.com/mscharley/generic-type-guard/blob/master/src/examples.spec.ts
