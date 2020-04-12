import * as tg from "./index";

// tslint:disable:no-console

export interface TestInterface {
  str: string;
  num: number;
}

const n: unknown = "something else";
const isFooOrBar = tg.isSingletonStringUnion("foo", "bar");

if (isFooOrBar(n)) {
  // The n variable is typed as "foo" | "bar" right now, but this won't ever print anything.
  console.log(n);
}

/**
 * Simple way to test an interface.
 */
export const isTestInterface: tg.TypeGuard<TestInterface> = (o: unknown): o is TestInterface =>
  tg.isObject(o) && tg.hasProperty("str", tg.isString)(o) && tg.hasProperty("num", tg.isNumber)(o);


/**
 * More type-safe way to test an interface.
 *
 * You can then combine this PartialTypeGuard with isObject to get a full typeguard
 * from `undefined`. If you add properties to TestInterface or change types then this form will
 * trigger a type error as the interfaces won't match up structurally.
 */
export const isTypeSafeTestInterface: tg.PartialTypeGuard<{}, TestInterface> =
  tg.isIntersection(tg.hasProperty("str", tg.isString), tg.hasProperty("num", tg.isNumber));

/**
 * If you have multiple sets of things to test there is also a fluent-ish interface.
 *
 * This is exposed for both intersection and union combinators.
 * 
 * If you have a complex interface like this, then the best way to deal with the type is to 
 * generate it from the guard if feasible.
 */
export const isTypeSafeComplexInterface =
  new tg.IntersectionOf(tg.hasProperty("str", tg.isString))
    .with(tg.hasProperty("num", tg.isNumber))
    .with(tg.hasProperty("b", tg.isBoolean))
    .with(tg.hasProperty("maybeString", tg.isUnion(tg.isUndefined, tg.isString)))
    .with(tg.hasProperty("nullableString", tg.isNullable(tg.isString))).get();
export type ComplexInterface = tg.GuardedType<typeof isTypeSafeComplexInterface>;

/**
 * This is the alternative syntax for defining interfaces in a bit cleaner way.
 */
export const isTypeSafeComplexInterface2: tg.TypeGuard<ComplexInterface> =
  new tg.IsInterface().withProperties({
    b: tg.isBoolean,
    maybeString: tg.isOptional(tg.isString),
    nullableString: tg.isNullable(tg.isString),
    num: tg.isNumber,
    str: tg.isString,
  }).get();

/* This is supposed to fail to compile. This is here for quick checking in later releases.
const isFoo: tg.PartialTypeGuard<string, "foo"> = (s: string): s is "foo" => s === "foo";
export const isSomething: tg.TypeGuard<{ foo: Array<"foo"> }> = tg.isRecord("foo", tg.narrowArray(isFoo));
/**/
