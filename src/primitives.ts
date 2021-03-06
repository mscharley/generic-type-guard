import type { PartialTypeGuard, TypeGuard } from './guards';

/**
 * Helper to diff types.
 * @public
 */
export type Diff<T, U> = T extends U ? never : T;

const MINIMUM_ARRAY_INDEX = 0;

/**
 * Validate if a value is a javascript number.
 *
 * @public
 */
export const isNumber: TypeGuard<number> = (n: unknown): n is number =>
  typeof n === 'number' && !global.isNaN(n);

/**
 * Validate the value is a finite number.
 *
 * @public
 */
export const isFiniteNumber: TypeGuard<number> = (n: unknown): n is number =>
  typeof n === 'number' && !global.isNaN(n) && global.isFinite(n);

/**
 * Validate the value is a number in the rawest sense.
 *
 * This check is exactly what the type system says on the tin. This value is a floating point value with all
 * the edge cases that entails.
 *
 * @public
 */
export const isFloat: TypeGuard<number> = (n: unknown): n is number =>
  typeof n === 'number';

/**
 * Alias for isFloat.
 *
 * @see isFloat()
 * @public
 */
export const isDouble = isFloat;

/**
 * Validate the value is infinite.
 *
 * @public
 */
export const isInfinity: TypeGuard<number> = (n: unknown): n is number =>
  typeof n === 'number' && !global.isNaN(n) && !global.isFinite(n);

/**
 * Validates a value is exactly the NaN constant value.
 *
 * @public
 */
export const isNaN: TypeGuard<number> = (n: unknown): n is number =>
  typeof n === 'number' && global.isNaN(n);

/**
 * Validates that a value is one of a set of values.
 *
 * @public
 */
export const isElementOf = (<T>(...ss: T[]): TypeGuard<T> => (
  s: unknown,
): s is T => ss.indexOf(s as T) >= MINIMUM_ARRAY_INDEX) as {
  (): TypeGuard<never>;
  <T>(...ss: T[]): TypeGuard<T>;
};

/**
 * Validate if a value is a specific javascript number.
 *
 * @public
 */
export const isSingletonNumber = <T extends number>(v: T): TypeGuard<T> => (
  n: unknown,
): n is T => n === v;

/**
 * Validate if a value is one of a set of specific numbers.
 *
 * @public
 */
export const isSingletonNumberUnion = (<T extends number>(
  ...ss: T[]
): TypeGuard<T> => (s: unknown): s is T =>
  ss.indexOf(s as T) >= MINIMUM_ARRAY_INDEX) as {
  (): TypeGuard<never>;
  <T extends number>(...ss: T[]): TypeGuard<T>;
};

/**
 * Validate if a value is a string.
 *
 * @public
 */
export const isString: TypeGuard<string> = (s: unknown): s is string =>
  typeof s === 'string';

/**
 * Validate if a value is a specific string.
 *
 * @public
 */
export const isSingletonString = <T extends string>(v: T): TypeGuard<T> => (
  s: unknown,
): s is T => s === v;

/**
 * Validate if a value is one of a set of specific strings.
 *
 * @public
 */
export const isSingletonStringUnion = (<T extends string>(
  ...ss: T[]
): TypeGuard<T> => (s: unknown): s is T =>
  ss.indexOf(s as T) >= MINIMUM_ARRAY_INDEX) as {
  (): TypeGuard<never>;
  <T extends string>(...ss: T[]): TypeGuard<T>;
};

/**
 * Validate if a value is a boolean.
 *
 * @public
 */
export const isBoolean: TypeGuard<boolean> = (b: unknown): b is boolean =>
  typeof b === 'boolean';

/**
 * Validate if a value is the constant null.
 *
 * @public
 */
export const isNull: TypeGuard<null> = (o: unknown): o is null => o === null;

/**
 * Validate if a value is the constant undefined.
 *
 * @public
 */
export const isUndefined: TypeGuard<undefined> = (u: unknown): u is undefined =>
  typeof u === 'undefined';

/**
 * Validate if a value is optionally a given type.
 *
 * @public
 */
export const isOptional = <T>(tgt: TypeGuard<T>): TypeGuard<T | undefined> => (
  o: unknown,
): o is T | undefined => typeof o === 'undefined' || tgt(o);

/**
 * Validate if a value is a given type or null.
 *
 * @public
 */
export const isNullable = <T>(tgt: TypeGuard<T>): TypeGuard<T | null> => (
  o: unknown,
): o is T | null => o === null || tgt(o);

/**
 * Validates if a value is a given type or null or undefined.
 *
 * @public
 */
export const isMissing = <T>(
  tgt: TypeGuard<T>,
): TypeGuard<T | undefined | null> => (o: unknown): o is T | null | undefined =>
  o == null || tgt(o);

/**
 * Validate if a value is an array of a specific type of value.
 *
 * @public
 */
export const isArray = <T>(valueCheck: TypeGuard<T>): TypeGuard<T[]> => (
  arr: unknown,
): arr is T[] =>
  Array.isArray(arr) &&
  arr.reduce<boolean>((acc, v) => acc && valueCheck(v as unknown), true);

/**
 * Narrow the type of a value.
 *
 * @public
 */
export const narrowValue = <T, U extends T, V extends U>(
  ptt: PartialTypeGuard<T, U>,
  ptu: PartialTypeGuard<U, V>,
): PartialTypeGuard<T, V> => (t: T): t is V => ptt(t) && ptu(t);

/**
 * Narrow the type of elements inside an array.
 *
 * @public
 */
export const narrowArray = <T, U extends T>(
  pt: PartialTypeGuard<T, U>,
): PartialTypeGuard<T[], U[]> => (ts: T[]): ts is U[] =>
  ts.reduce<boolean>((acc, b) => acc && pt(b), true);

/**
 * Validate if a value is like an object.
 *
 * Specifically, this only checks typeof === "object" which includes
 * things that typescript has other primitives for like arrays.
 *
 * @public
 */
export const isObjectLike: TypeGuard<object> = (obj: unknown): obj is object =>
  obj != null && typeof obj === 'object';

/**
 * Validate if a value is an object.
 *
 * @public
 */
export const isObject: TypeGuard<object> = (obj: unknown): obj is object =>
  obj != null && typeof obj === 'object' && !(obj instanceof Array);

/**
 * Validates if a value is not null and not undefined.
 *
 * @public
 */
export const isSet = <T = unknown>(obj: T): obj is Diff<T, undefined | null> =>
  obj != null;

/**
 * Helper for asserting nothing at all.
 *
 * Note: this is very rarely useful. You probably want isSet. isAny
 * allows null and undefined through as well - it matches TypeScripts type
 * and simply returns a static true because anything is an any.
 *
 * You can use isSet to validate that a value is non-null then let TypeScript
 * widen it back to any in your interface.
 *
 * @public
 */
export const isAny: TypeGuard<unknown> = (_a: unknown): _a is unknown => true;

/**
 * Alias for isAny.
 *
 * @see isAny
 * @public
 */
export const isUnknown = isAny;

/**
 * Helper for exhaustiveness checking.
 *
 * @public
 */
export const isNever = (n: never): never => {
  throw Error(`Unexpected value when expecting never: ${n}`);
};
