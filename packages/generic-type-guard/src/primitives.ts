import { PartialTypeGuard, TypeGuard } from "./guards";

type Diff<T, U> = T extends U ? never : T;

/**
 * Validate if a value is a javascript number.
 */
export const isNumber: TypeGuard<number> = (n): n is number =>
  typeof n === "number" && !global.isNaN(n);

/**
 * Validate the value is a finite number.
 */
export const isFiniteNumber: TypeGuard<number> = (n): n is number =>
  typeof n === "number" && !global.isNaN(n) && global.isFinite(n);

/**
 * Validate the value is a number in the rawest sense.
 *
 * This check is exactly what the type system says on the tin. This value is a floating point value with all
 * the edge cases that entails.
 */
export const isFloat: TypeGuard<number> = (n): n is number =>
  typeof n === "number";

/**
 * Alias for isFloat.
 *
 * @see isFloat()
 */
export const isDouble = isFloat;

/**
 * Validate the value is infinite.
 */
export const isInfinity: TypeGuard<number> = (n): n is number =>
  typeof n === "number" && !global.isNaN(n) && !global.isFinite(n);

/**
 * Validates a value is exactly the NaN constant value.
 */
export const isNaN: TypeGuard<number> = (n): n is number =>
  typeof n === "number" && global.isNaN(n);

/**
 * Validate if a value is a specific javascript number.
 */
export const isSingletonNumber = <T extends number>(v: T): TypeGuard<T> => (n): n is T =>
  n === v;

/**
 * Validate if a value is one of a set of specific numbers.
 */
export const isSingletonNumberUnion = <T extends number>(...ns: T[]): TypeGuard<T> =>
  (n): n is T => ns.indexOf(n as T) >= 0;

/**
 * Validate if a value is a string.
 */
export const isString: TypeGuard<string> = (s): s is string =>
  typeof s === "string";

/**
 * Validate if a value is a specific string.
 */
export const isSingletonString = <T extends string>(v: T): TypeGuard<T> => (s): s is T =>
  s === v;

/**
 * Validate if a value is one of a set of specific strings.
 */
export const isSingletonStringUnion = <T extends string>(...ss: T[]): TypeGuard<T> =>
  (s): s is T => ss.indexOf(s as T) >= 0;

/**
 * Validate if a value is a boolean.
 */
export const isBoolean: TypeGuard<boolean> = (b): b is boolean =>
  typeof b === "boolean";

/**
 * Validate if a value is the constant null.
 */
export const isNull: TypeGuard<null> = (o): o is null =>
  o === null;

/**
 * Validate if a value is the constant undefined.
 */
export const isUndefined: TypeGuard<undefined> = (u): u is undefined =>
  typeof u === "undefined";

/**
 * Validate if a value is optionally a given type.
 */
export const isOptional = <T>(tgt: TypeGuard<T>): TypeGuard<T | undefined> =>
  (o): o is T | undefined => typeof o === "undefined" || tgt(o);

/**
 * Validate if a value is a given type or null.
 */
export const isNullable = <T>(tgt: TypeGuard<T>): TypeGuard<T | null> =>
  (o): o is T | null => o === null || tgt(o);

/**
 * Validates if a value is a given type or null or undefined.
 */
export const isMissing = <T>(tgt: TypeGuard<T>): TypeGuard<T | undefined | null> =>
  (o): o is T | null | undefined => o == null || tgt(o);

/**
 * Validate if a value is an array of a specific type of value.
 */
export const isArray =
  <T>(valueCheck: TypeGuard<T>): TypeGuard<T[]> => (arr: unknown): arr is T[] =>
    Array.isArray(arr) && arr.reduce<boolean>((acc, v) => acc && valueCheck(v as unknown), true);

/**
 * Narrow the type of elements inside an array.
 */
export const narrowArray =
  <T, U extends T>(pt: PartialTypeGuard<T, U>): PartialTypeGuard<T[], U[]> =>
    (ts: T[]): ts is U[] => ts.reduce<boolean>((acc, b) => acc && pt(b), true);

/**
 * Validate if a value is like an object.
 *
 * Specifically, this only checks typeof === "object" which includes
 * things that typescript has other primitives for like arrays.
 */
export const isObjectLike: TypeGuard<{}> = (obj: unknown): obj is {} =>
  obj != null && typeof obj === "object";

/**
 * Validate if a value is an object.
 */
export const isObject: TypeGuard<{}> = (obj: unknown): obj is {} =>
  obj != null && typeof obj === "object" && !(obj instanceof Array);

/**
 * Validates if a value is not null and not undefined.
 */
export const isSet =
  <T = unknown>(obj: T): obj is Diff<T, undefined | null> => obj != null;

/**
 * Helper for asserting nothing at all.
 *
 * Note: this is very rarely useful. You probably want isSet. isAny
 * allows null and undefined through as well - it matches TypeScripts type
 * and simply returns a static true because anything is an any.
 *
 * You can use isSet to validate that a value is non-null then let TypeScript
 * widen it back to any in your interface.
 */
export const isAny: TypeGuard<unknown> = (_a: unknown): _a is unknown => true; /* eslint-disable-line @typescript-eslint/no-unused-vars */

/**
 * Alias for isAny.
 *
 * @see isAny
 */
export const isUnknown = isAny;

/**
 * Helper for exhaustiveness checking.
 */
export const isNever = (n: never): never => {
  throw Error(`Unexpected value when expecting never: ${n}`);
};
