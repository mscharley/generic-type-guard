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
 * Validate if a value is one of a set of specific numbers.
 */
export const isSingletonNumberUnion = <T extends number>(...ns: T[]): TypeGuard<T> =>
  (n): n is T => ns.find((v) => v === n) !== undefined;

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
  (s): s is T => ss.find((v) => v === s) !== undefined;

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
 * Validates if a value is not null and not undefined.
 */
export const isSet = (obj: any): obj is {} | number | string | boolean | symbol =>
  obj != null;

/**
 * Helper for asserting nothing at all.
 */
export const isAny = (_a: any): _a is any => true;

/* istanbul ignore next */
/**
 * Helper for exhaustiveness checking.
 */
export const isNever = (n: never): never => {
  // No coverage checking as it is impossible to call this function, and that's the point.
  throw Error(`Unexpected value when expecting never: ${n}`);
};
