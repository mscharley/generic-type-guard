import { TypeGuard } from "./guards";

/**
 * Validate if a value is a javascript number.
 */
export const isNumber: TypeGuard<number> = (n): n is number =>
  typeof n === "number";

/**
 * Validate if a value is a specific javascript number.
 */
export const isSingletonNumber = <T extends number>(v: T): TypeGuard<T> => (n): n is T =>
  n === v;

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
  <T>(valueCheck: TypeGuard<T>): TypeGuard<T[]> => (arr: any): arr is T[] =>
    Array.isArray(arr) && arr.reduce<boolean>((acc, v) => acc && valueCheck(v), true);

/**
 * Validate if a value is an object.
 */
export const isObject = (obj: any): obj is {} =>
  obj != null && typeof obj === "object" && !(obj instanceof Array);

/**
 * Helper for exhaustiveness checking.
 */
export const isNever = (n: never): never => {
  throw Error(`Unexpected value when expecting never: ${n}`);
};
