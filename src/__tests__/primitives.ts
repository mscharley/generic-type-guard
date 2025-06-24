/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as p from '../primitives.js';
import { describe, expect, it } from '@jest/globals';

/**
 * Compilation tests for the primitive types.
 */
describe('primitives', () => {
	it('string', () => {
		expect(p.isString('foo')).toBe(true);
		expect(p.isString(10)).toBe(false);
	});

	it('number', () => {
		expect(p.isNumber(NaN)).toBe(false);
		expect(p.isNumber(Infinity)).toBe(true);
		expect(p.isNumber(10)).toBe(true);
		expect(p.isNumber('foo')).toBe(false);
	});

	it('finiteNumber', () => {
		expect(p.isFiniteNumber(NaN)).toBe(false);
		expect(p.isFiniteNumber(Infinity)).toBe(false);
		expect(p.isFiniteNumber(10)).toBe(true);
		expect(p.isFiniteNumber('foo')).toBe(false);
	});

	it('float', () => {
		expect(p.isFloat(NaN)).toBe(true);
		expect(p.isFloat(Infinity)).toBe(true);
		expect(p.isFloat(10)).toBe(true);
		expect(p.isFloat('foo')).toBe(false);
	});

	it('double', () => {
		// This is a reference equality check.
		expect(p.isDouble).toBe(p.isFloat);
	});

	it('infinity', () => {
		expect(p.isInfinity(NaN)).toBe(false);
		expect(p.isInfinity(Infinity)).toBe(true);
		expect(p.isInfinity(-Infinity)).toBe(true);
		expect(p.isInfinity(10)).toBe(false);
		expect(p.isInfinity('foo')).toBe(false);
	});

	it('nan', () => {
		expect(p.isNaN(NaN)).toBe(true);
		expect(p.isNaN(Infinity)).toBe(false);
		expect(p.isNaN(10)).toBe(false);
		expect(p.isNaN('foo')).toBe(false);
	});

	it('boolean', () => {
		expect(p.isBoolean(true)).toBe(true);
		expect(p.isBoolean(false)).toBe(true);
		expect(p.isBoolean(null)).toBe(false);
		expect(p.isBoolean(10)).toBe(false);
	});

	it('null', () => {
		expect(p.isNull(null)).toBe(true);
		expect(p.isNull(10)).toBe(false);
	});

	it('undefined', () => {
		const foo: { bar?: string } = {};
		expect(p.isUndefined(undefined)).toBe(true);
		expect(p.isUndefined(foo.bar)).toBe(true);
		expect(p.isUndefined(10)).toBe(false);
	});

	it('optional', () => {
		const isOptionalString = p.isOptional(p.isString);
		expect(isOptionalString('foo')).toBe(true);
		expect(isOptionalString('')).toBe(true);
		expect(isOptionalString(undefined)).toBe(true);
		expect(isOptionalString(null)).toBe(false);
		expect(isOptionalString(10)).toBe(false);
		expect(isOptionalString(0)).toBe(false);
	});

	it('nullable', () => {
		const isNullableString = p.isNullable(p.isString);
		expect(isNullableString('foo')).toBe(true);
		expect(isNullableString('')).toBe(true);
		expect(isNullableString(undefined)).toBe(false);
		expect(isNullableString(null)).toBe(true);
		expect(isNullableString(10)).toBe(false);
		expect(isNullableString(0)).toBe(false);
	});

	it('missing', () => {
		const isMissingString = p.isMissing(p.isString);
		expect(isMissingString('foo')).toBe(true);
		expect(isMissingString('')).toBe(true);
		expect(isMissingString(undefined)).toBe(true);
		expect(isMissingString(null)).toBe(true);
		expect(isMissingString(0)).toBe(false);
		expect(isMissingString(10)).toBe(false);
	});

	it('elementOf', () => {
		const isTen = p.isElementOf<number | string>(10, 'ten');
		expect(isTen('ten')).toBe(true);
		expect(isTen(10)).toBe(true);
		expect(isTen(100)).toBe(false);
		expect(isTen(true)).toBe(false);
	});

	it('singletonString', () => {
		const isHello = p.isSingletonString('Hello');
		expect(isHello('Hello')).toBe(true);
		expect(isHello('foo')).toBe(false);
	});

	it('singletonStringUnion', () => {
		const isGreeting = p.isSingletonStringUnion('hello', 'こんにちは');
		expect(isGreeting('hello')).toBe(true);
		expect(isGreeting('こんにちは')).toBe(true);
		expect(isGreeting('foo')).toBe(false);
		expect(isGreeting(5)).toBe(false);
	});

	it('singletonNumber', () => {
		const isTen = p.isSingletonNumber(10);
		expect(isTen(10)).toBe(true);
		expect(isTen(50)).toBe(false);
		expect(isTen('Hello')).toBe(false);
	});

	it('singletonNumberUnion', () => {
		const isTeen = p.isSingletonNumberUnion(13, 14, 15, 16, 17, 18, 19);
		expect(isTeen(13)).toBe(true);
		expect(isTeen(15)).toBe(true);
		expect(isTeen(20)).toBe(false);
		expect(isTeen('hello')).toBe(false);
	});

	it('array', () => {
		const isNumberArray = p.isArray(p.isNumber);

		expect(isNumberArray([])).toBe(true);
		expect(isNumberArray([1, 2, 3])).toBe(true);
		expect(isNumberArray([1, 2, 'foo'])).toBe(false);
		expect(isNumberArray({})).toBe(false);
	});

	it('notEmptyList', () => {
		const isNumberNel = p.isNotEmptyList(p.isNumber);

		expect(isNumberNel([])).toBe(false);
		expect(isNumberNel([1, 2, 3])).toBe(true);
		expect(isNumberNel([1, 2, 'foo'])).toBe(false);
		expect(isNumberNel({})).toBe(false);
	});

	it('narrowValue', () => {
		// eslint-disable-next-line @typescript-eslint/no-deprecated
		const narrow = p.narrowValue<unknown, string, 'foo'>(p.isString, p.isSingletonString('foo'));

		expect(narrow('foo')).toBe(true);
		expect(narrow('hello world')).toBe(false);
		expect(narrow(10)).toBe(false);
	});

	it('narrowArray', () => {
		const isNumberArray = p.narrowArray<number | string, number>(p.isNumber);

		expect(isNumberArray([10, 20])).toBe(true);
		expect(isNumberArray([10, 'foo'])).toBe(false);
		expect(isNumberArray([])).toBe(true);
	});

	it('setOf', () => {
		const isNumberSet = p.isSetOf(p.isNumber);

		expect(isNumberSet(new Set([4, 5]))).toBe(true);
		expect(isNumberSet(new Set(['hello', 'world']))).toBe(false);
		expect(isNumberSet([4, 5])).toBe(false);
		expect(isNumberSet(5)).toBe(false);
	});

	it('objectLike', () => {
		expect(p.isObjectLike({ foo: 'bar' })).toBe(true);
		expect(p.isObjectLike([])).toBe(true);
		expect(p.isObjectLike(null)).toBe(false);
		expect(p.isObjectLike(undefined)).toBe(false);
		expect(p.isObjectLike('hello')).toBe(false);
		expect(p.isObjectLike(10)).toBe(false);
	});

	it('object', () => {
		expect(p.isObject({ foo: 'bar' })).toBe(true);
		expect(p.isObject([])).toBe(false);
		expect(p.isObject(null)).toBe(false);
		expect(p.isObject(undefined)).toBe(false);
		expect(p.isObject('hello')).toBe(false);
		expect(p.isObject(10)).toBe(false);
	});

	it('set', () => {
		expect(p.isSet(42)).toBe(true);
		expect(p.isSet(true)).toBe(true);
		expect(p.isSet(false)).toBe(true);
		expect(p.isSet('foo')).toBe(true);
		expect(p.isSet(Symbol('Testing symbol'))).toBe(true);
		expect(p.isSet(null)).toBe(false);
		expect(p.isSet(undefined)).toBe(false);
		expect(p.isSet([])).toBe(true);
		expect(p.isSet({})).toBe(true);
	});

	it('numericalEnumeration', () => {
		enum NumEnum {
			READ = 1,
			WRITE = 2,
			EXECUTE = 4,
		}

		const isNumEnum = p.isNumericalEnumeration(NumEnum);
		expect(isNumEnum(NumEnum.READ)).toBe(true);
		expect(isNumEnum(NumEnum.WRITE)).toBe(true);
		expect(isNumEnum(NumEnum.EXECUTE)).toBe(true);
		expect(isNumEnum(NumEnum.READ | NumEnum.WRITE)).toBe(false);
		expect(isNumEnum(0)).toBe(false);
		expect(isNumEnum(2)).toBe(true);
		expect(isNumEnum(3)).toBe(false);
		expect(isNumEnum(8)).toBe(false);
		expect(isNumEnum('READ')).toBe(false);
		expect(isNumEnum(null)).toBe(false);

		const isNumFlag = p.isNumericalEnumeration(NumEnum, true);
		expect(isNumFlag(NumEnum.READ)).toBe(true);
		expect(isNumFlag(NumEnum.WRITE)).toBe(true);
		expect(isNumFlag(NumEnum.EXECUTE)).toBe(true);
		expect(isNumFlag(NumEnum.READ | NumEnum.WRITE)).toBe(true);
		expect(isNumFlag(0)).toBe(false);
		expect(isNumFlag(2)).toBe(true);
		expect(isNumFlag(3)).toBe(true);
		expect(isNumFlag(8)).toBe(false);
		expect(isNumFlag('READ')).toBe(false);
		expect(isNumFlag(null)).toBe(false);
	});

	it('stringEnumeration', () => {
		enum StringEnum {
			Foo = 'FOO',
			Bar = 'BAR',
		}

		const isStringEnum = p.isStringEnumeration(StringEnum);
		expect(isStringEnum(StringEnum.Foo)).toBe(true);
		expect(isStringEnum(StringEnum.Bar)).toBe(true);
		expect(isStringEnum('FOO')).toBe(true);
		expect(isStringEnum('BAR')).toBe(true);
		expect(isStringEnum('Foo')).toBe(false);
		expect(isStringEnum('Bar')).toBe(false);
		expect(isStringEnum(false)).toBe(false);
		expect(isStringEnum(null)).toBe(false);
	});

	it('any', () => {
		expect(p.isAny(true)).toBe(true);
		expect(p.isAny('')).toBe(true);
		expect(p.isAny(50)).toBe(true);
		expect(p.isAny(null)).toBe(true);
		expect(p.isAny(undefined)).toBe(true);
		expect(p.isAny([])).toBe(true);
		expect(p.isAny({})).toBe(true);
	});

	it('never', () => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
		const fn: Function = p.isNever;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
		expect(() => fn('Oops!')).toThrow('Unexpected value when expecting never: Oops!');
	});
});
