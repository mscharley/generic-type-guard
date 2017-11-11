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

The point of this library is to provide a suite of type guard expressions that are 
themselves both type safe and composable in a type safe way. To that end we define two new
types which are just aliases for the built-in type guard type:

```typescript
export type PartialTypeGuard<T, U extends T> = (value: T) => value is U;
export type TypeGuard<T> = PartialTypeGuard<any, T>;
```

A `PartialTypeGuard` is a type guard which given a value of type `T` can prove it is 
actually the specialised type `U`. A `TypeGuard` is a type guard that can prove `any` value
to be of type `T`; it is a `PartialTypeGuard<any, T>`.

### Type safety

What do we mean by type safety when we're talking about something that in a lot of ways
is inherantly type unsafe? We simply mean that if you change the definition your
interface/variable/whatever you are checking then your type guard should no longer
successfully compile.

### Examples

Some examples:

```typescript 
import * as tg from "generic-type-guard";

export interface TestInterface {
  str: string;
  num: number;
}

const isTypeSafeTestInterface: tg.PartialTypeGuard<{}, TestInterface> =
  tg.isIntersection(tg.hasProperty("str", tg.isString), tg.hasProperty("num", tg.isNumber));

export const isTestInterface: TypeGuard<TestInterface> = (o: any): o is TestInterface =>
  isObject(o) && isTypeSafeTestInterface(o);

// or perhaps you have a larger interface...

export interface ComplexInterface extends TestInterface {
  b: boolean;
  maybeString?: string;
}

export const isTypeSafeComplexInterface: tg.PartialTypeGuard<{}, ComplexInterface> =
  new tg.IntersectionOf(tg.hasProperty("str", tg.isString), tg.hasProperty("num", tg.isNumber))
    .with(tg.hasProperty("b", tg.isBoolean))
    .with(tg.hasProperty("maybeString", tg.isUnion(tg.isUndefined, tg.isString))).get();
```

[There are more examples available.][example-usage]

  [gh-contrib]: https://github.com/mscharley/generic-type-guard/graphs/contributors
  [gh-issues]: https://github.com/mscharley/generic-type-guard/issues
  [license]: https://github.com/mscharley/generic-type-guard/blob/master/LICENSE
  [example-usage]: https://github.com/mscharley/generic-type-guard/blob/master/src/examples.spec.ts
