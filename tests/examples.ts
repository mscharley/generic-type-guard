import * as tg from "../src/index";

// tslint:disable:no-console

export interface TestInterface {
  str: string;
  num: number;
}

export interface ComplexInterface extends TestInterface {
  b: boolean;
  maybeString?: string;
  nullableString: string | null;
}

const n: any = "something else";
const isFooOrBar = tg.isSingletonStringUnion("foo", "bar");

if (isFooOrBar(n)) {
  // The n variable is typed as "foo" | "bar" right now, but this won't ever print anything.
  console.log(n);
}

/**
 * Simple way to test an interface.
 */
export const isTestInterface: tg.TypeGuard<TestInterface> = (o: any): o is TestInterface =>
  tg.isObject(o) && tg.hasProperty("str", tg.isString)(o) && tg.hasProperty("num", tg.isNumber)(o);

/**
 * More type-safe way to test an interface.
 *
 * You can then combine this PartialTypeGuard with isObject to get a full typeguard
 * from `any`. If you add properties to TestInterface or change types then this form will
 * trigger a type error as the interfaces won't match up structurally.
 */
export const isTypeSafeTestInterface: tg.PartialTypeGuard<{}, TestInterface> =
  tg.isIntersection(tg.hasProperty("str", tg.isString), tg.hasProperty("num", tg.isNumber));

/**
 * If you have multiple sets of things to test there is also a fluent-ish interface.
 *
 * This is exposed for both intersection and union combinators.
 */
export const isTypeSafeComplexInterface: tg.PartialTypeGuard<{}, ComplexInterface> =
  new tg.IntersectionOf(tg.hasProperty("str", tg.isString), tg.hasProperty("num", tg.isNumber))
    .with(tg.hasProperty("b", tg.isBoolean))
    .with(tg.hasProperty("maybeString", tg.isUnion(tg.isUndefined, tg.isString)))
    .with(tg.hasProperty("nullableString", tg.isNullable(tg.isString))).get();
