/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import type { PartialTypeGuard, TypeGuard } from './guards.js';
import { combine } from './utils.js';

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
export const isNumber: TypeGuard<number> = (n: unknown): n is number => typeof n === 'number' && !isNaN(n);

/**
 * Validate the value is a finite number.
 *
 * @public
 */
export const isFiniteNumber: TypeGuard<number> = (n: unknown): n is number =>
	typeof n === 'number' && !isNaN(n) && isFinite(n);

/**
 * Validate the value is a number in the rawest sense.
 *
 * This check is exactly what the type system says on the tin. This value is a floating point value with all
 * the edge cases that entails.
 *
 * @public
 */
export const isFloat: TypeGuard<number> = (n: unknown): n is number => typeof n === 'number';

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
	typeof n === 'number' && !isNaN(n) && !isFinite(n);

/**
 * Validates a value is exactly the NaN constant value.
 *
 * @public
 */
const _isNaN: TypeGuard<number> = (n: unknown): n is number => typeof n === 'number' && isNaN(n);
export { _isNaN as isNaN };

/**
 * Validates that a value is one of a set of values.
 *
 * @public
 */
export const isElementOf = (<T>(...ss: T[]): TypeGuard<T> =>
	(s: unknown): s is T =>
		ss.indexOf(s as T) >= MINIMUM_ARRAY_INDEX) as {
	(): TypeGuard<never>;
	<T>(...ss: T[]): TypeGuard<T>;
};

/**
 * Validate if a value is a specific javascript number.
 *
 * @public
 */
export const isSingletonNumber
	= <T extends number>(v: T): TypeGuard<T> =>
		(n: unknown): n is T =>
			n === v;

/**
 * Validate if a value is one of a set of specific numbers.
 *
 * @public
 */
export const isSingletonNumberUnion = (<T extends number>(...ss: T[]): TypeGuard<T> =>
	(s: unknown): s is T =>
		ss.indexOf(s as T) >= MINIMUM_ARRAY_INDEX) as {
	(): TypeGuard<never>;
	<T extends number>(...ss: T[]): TypeGuard<T>;
};

/**
 * Validate if a value is a string.
 *
 * @public
 */
export const isString: TypeGuard<string> = (s: unknown): s is string => typeof s === 'string';

/**
 * Validate if a value is a specific string.
 *
 * @public
 */
export const isSingletonString
	= <T extends string>(v: T): TypeGuard<T> =>
		(s: unknown): s is T =>
			s === v;

/**
 * Validate if a value is one of a set of specific strings.
 *
 * @public
 */
export const isSingletonStringUnion = (<T extends string>(...ss: T[]): TypeGuard<T> =>
	(s: unknown): s is T =>
		ss.indexOf(s as T) >= MINIMUM_ARRAY_INDEX) as {
	(): TypeGuard<never>;
	<T extends string>(...ss: T[]): TypeGuard<T>;
};

/**
 * Validate if a value is a boolean.
 *
 * @public
 */
export const isBoolean: TypeGuard<boolean> = (b: unknown): b is boolean => typeof b === 'boolean';

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
export const isUndefined: TypeGuard<undefined> = (u: unknown): u is undefined => typeof u === 'undefined';

/**
 * Validate if a value is optionally a given type.
 *
 * @public
 */
export const isOptional
	= <T>(tgt: TypeGuard<T>): TypeGuard<T | undefined> =>
		(o: unknown): o is T | undefined =>
			typeof o === 'undefined' || tgt(o);

/**
 * Validate if a value is a given type or null.
 *
 * @public
 */
export const isNullable
	= <T>(tgt: TypeGuard<T>): TypeGuard<T | null> =>
		(o: unknown): o is T | null =>
			o === null || tgt(o);

/**
 * Validates if a value is a given type or null or undefined.
 *
 * @public
 */
export const isMissing
	= <T>(tgt: TypeGuard<T>): TypeGuard<T | undefined | null> =>
		(o: unknown): o is T | null | undefined =>
			o == null || tgt(o);

/**
 * Validate if a value is an array of a specific type of value.
 *
 * @public
 */
export const isArray
	= <T>(valueCheck: TypeGuard<T>): TypeGuard<T[]> =>
		(arr: unknown): arr is T[] =>
			Array.isArray(arr) && arr.reduce<boolean>((acc, v) => acc && valueCheck(v as unknown), true);

/**
 * Validate if a value is a non-empty array of a specific type of value.
 *
 * @public
 */
export const isNotEmptyList
	= <T>(valueCheck: TypeGuard<T>): TypeGuard<[T, ...T[]]> =>
		(arr: unknown): arr is [T, ...T[]] =>
			Array.isArray(arr)
			&& arr.length >= 1
			&& arr.reduce<boolean>((acc, v) => acc && valueCheck(v as unknown), true);

/**
 * Narrow the type of a value.
 *
 * @public
 * @deprecated Use combine instead, this alias is poorly named.
 */
export const narrowValue = <T, U extends T, V extends U>(
	ptt: PartialTypeGuard<T, U>,
	ptu: PartialTypeGuard<U, V>,
): PartialTypeGuard<T, V> => combine(ptt, ptu);

/**
 * Narrow the type of elements inside an array.
 *
 * @public
 */
export const narrowArray
	= <T, U extends T>(pt: PartialTypeGuard<T, U>): PartialTypeGuard<T[], U[]> =>
		(ts: T[]): ts is U[] =>
			ts.reduce<boolean>((acc, b) => acc && pt(b), true);

/**
 * Validate if an object is a Set containing elements of a given type.
 *
 * @public
 */
export const isSetOf
	= <T>(tg: TypeGuard<T>) =>
		(o: unknown): o is Set<T> =>
			o instanceof Set
			&& Array.of(...(o as Set<unknown>).values()).reduce<boolean>((acc, v) => acc && tg(v), true);

/**
 * Validate if a value is like an object.
 *
 * Specifically, this only checks typeof === "object" which includes
 * things that typescript has other primitives for like arrays.
 *
 * @public
 */
export const isObjectLike: TypeGuard<object> = (obj: unknown): obj is object => obj != null && typeof obj === 'object';

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
export const isSet = <T = unknown>(obj: T): obj is Diff<T, undefined | null> => obj != null;

/**
 * Validates if a value is a valid part of a numeric enumeration.
 *
 * @param e - The enumeration to check
 * @param flags - Whether this is a flag style enumeration
 *
 * @public
 */
export const isNumericalEnumeration = <T extends Record<string | number, string | number>>(
	e: T,
	flags = false,
): TypeGuard<T> => {
	const options = Object.values(e).filter(isNumber);
	if (!flags) {
		return (obj: unknown): obj is T => (options as unknown[]).includes(obj);
	} else {
		return (obj: unknown): obj is T =>
			typeof obj === 'number'
			&& obj !== 0
			&& options.filter((v) => (v & obj) === v).reduce((acc, v) => acc | v, 0) === obj;
	}
};

/**
 * Validates if a value is a valid part of a string enumeration.
 *
 * @param e - The enumeration to check
 *
 * @public
 */
export const isStringEnumeration = <T extends Record<string, string>>(e: T): TypeGuard<T> => {
	const options: unknown[] = Object.values(e);
	return (obj: unknown): obj is T => options.includes(obj);
};

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
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	throw Error(`Unexpected value when expecting never: ${n}`);
};
