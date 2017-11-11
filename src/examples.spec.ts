import * as tg from "./index";

export interface TestInterface {
  str: string;
  num: number;
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
