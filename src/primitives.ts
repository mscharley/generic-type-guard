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
 * Validate if a value is an array of a specific type of value.
 */
export const isArray =
  <T>(valueCheck: TypeGuard<T>): TypeGuard<T[]> => (arr: any): arr is T[] =>
    typeof arr === "object" && arr instanceof Array &&
    arr.reduce<boolean>((acc, v) => acc && valueCheck(v), true);

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
