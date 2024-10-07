/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as p from './primitives.js';
import { expect } from 'chai';

/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * Compilation tests for the primitive types.
 */
describe('Primitives', function (this: Mocha.Suite) {
	this.slow(5).timeout(3000);

	it('string', () => {
		expect(p.isString('foo')).to.equal(true);
		expect(p.isString(10)).to.equal(false);
	});

	it('number', () => {
		expect(p.isNumber(NaN)).to.equal(false);
		expect(p.isNumber(Infinity)).to.equal(true);
		expect(p.isNumber(10)).to.equal(true);
		expect(p.isNumber('foo')).to.equal(false);
	});

	it('finiteNumber', () => {
		expect(p.isFiniteNumber(NaN)).to.equal(false);
		expect(p.isFiniteNumber(Infinity)).to.equal(false);
		expect(p.isFiniteNumber(10)).to.equal(true);
		expect(p.isFiniteNumber('foo')).to.equal(false);
	});

	it('float', () => {
		expect(p.isFloat(NaN)).to.equal(true);
		expect(p.isFloat(Infinity)).to.equal(true);
		expect(p.isFloat(10)).to.equal(true);
		expect(p.isFloat('foo')).to.equal(false);
	});

	it('double', () => {
		// This is a reference equality check.
		expect(p.isDouble).to.equal(p.isFloat);
	});

	it('infinity', () => {
		expect(p.isInfinity(NaN)).to.equal(false);
		expect(p.isInfinity(Infinity)).to.equal(true);
		expect(p.isInfinity(-Infinity)).to.equal(true);
		expect(p.isInfinity(10)).to.equal(false);
		expect(p.isInfinity('foo')).to.equal(false);
	});

	it('nan', () => {
		expect(p.isNaN(NaN)).to.equal(true);
		expect(p.isNaN(Infinity)).to.equal(false);
		expect(p.isNaN(10)).to.equal(false);
		expect(p.isNaN('foo')).to.equal(false);
	});

	it('boolean', () => {
		expect(p.isBoolean(true)).to.equal(true);
		expect(p.isBoolean(false)).to.equal(true);
		expect(p.isBoolean(null)).to.equal(false);
		expect(p.isBoolean(10)).to.equal(false);
	});

	it('null', () => {
		expect(p.isNull(null)).to.equal(true);
		expect(p.isNull(10)).to.equal(false);
	});

	it('undefined', () => {
		const foo: { bar?: string } = {};
		expect(p.isUndefined(undefined)).to.equal(true);
		expect(p.isUndefined(foo.bar)).to.equal(true);
		expect(p.isUndefined(10)).to.equal(false);
	});

	it('optional', () => {
		const isOptionalString = p.isOptional(p.isString);
		expect(isOptionalString('foo')).to.equal(true);
		expect(isOptionalString('')).to.equal(true);
		expect(isOptionalString(undefined)).to.equal(true);
		expect(isOptionalString(null)).to.equal(false);
		expect(isOptionalString(10)).to.equal(false);
		expect(isOptionalString(0)).to.equal(false);
	});

	it('nullable', () => {
		const isNullableString = p.isNullable(p.isString);
		expect(isNullableString('foo')).to.equal(true);
		expect(isNullableString('')).to.equal(true);
		expect(isNullableString(undefined)).to.equal(false);
		expect(isNullableString(null)).to.equal(true);
		expect(isNullableString(10)).to.equal(false);
		expect(isNullableString(0)).to.equal(false);
	});

	it('missing', () => {
		const isMissingString = p.isMissing(p.isString);
		expect(isMissingString('foo')).to.equal(true);
		expect(isMissingString('')).to.equal(true);
		expect(isMissingString(undefined)).to.equal(true);
		expect(isMissingString(null)).to.equal(true);
		expect(isMissingString(0)).to.equal(false);
		expect(isMissingString(10)).to.equal(false);
	});

	it('elementOf', () => {
		const isTen = p.isElementOf<number | string>(10, 'ten');
		expect(isTen('ten')).to.equal(true);
		expect(isTen(10)).to.equal(true);
		expect(isTen(100)).to.equal(false);
		expect(isTen(true)).to.equal(false);
	});

	it('singletonString', () => {
		const isHello = p.isSingletonString('Hello');
		expect(isHello('Hello')).to.equal(true);
		expect(isHello('foo')).to.equal(false);
	});

	it('singletonStringUnion', () => {
		const isGreeting = p.isSingletonStringUnion('hello', 'こんにちは');
		expect(isGreeting('hello')).to.equal(true);
		expect(isGreeting('こんにちは')).to.equal(true);
		expect(isGreeting('foo')).to.equal(false);
		expect(isGreeting(5)).to.equal(false);
	});

	it('singletonNumber', () => {
		const isTen = p.isSingletonNumber(10);
		expect(isTen(10)).to.equal(true);
		expect(isTen(50)).to.equal(false);
		expect(isTen('Hello')).to.equal(false);
	});

	it('singletonNumberUnion', () => {
		const isTeen = p.isSingletonNumberUnion(13, 14, 15, 16, 17, 18, 19);
		expect(isTeen(13)).to.equal(true);
		expect(isTeen(15)).to.equal(true);
		expect(isTeen(20)).to.equal(false);
		expect(isTeen('hello')).to.equal(false);
	});

	it('array', () => {
		const isNumberArray = p.isArray(p.isNumber);

		expect(isNumberArray([])).to.equal(true);
		expect(isNumberArray([1, 2, 3])).to.equal(true);
		expect(isNumberArray([1, 2, 'foo'])).to.equal(false);
		expect(isNumberArray({})).to.equal(false);
	});

	it('narrowValue', () => {
		// eslint-disable-next-line @typescript-eslint/no-deprecated
		const narrow = p.narrowValue<unknown, string, 'foo'>(p.isString, p.isSingletonString('foo'));

		expect(narrow('foo')).to.equal(true);
		expect(narrow('hello world')).to.equal(false);
		expect(narrow(10)).to.equal(false);
	});

	it('narrowArray', () => {
		const isNumberArray = p.narrowArray<number | string, number>(p.isNumber);

		expect(isNumberArray([10, 20])).to.equal(true);
		expect(isNumberArray([10, 'foo'])).to.equal(false);
		expect(isNumberArray([])).to.equal(true);
	});

	it('setOf', () => {
		const isNumberSet = p.isSetOf(p.isNumber);

		expect(isNumberSet(new Set([4, 5]))).to.equal(true);
		expect(isNumberSet(new Set(['hello', 'world']))).to.equal(false);
		expect(isNumberSet([4, 5])).to.equal(false);
		expect(isNumberSet(5)).to.equal(false);
	});

	it('objectLike', () => {
		expect(p.isObjectLike({ foo: 'bar' })).to.equal(true);
		expect(p.isObjectLike([])).to.equal(true);
		expect(p.isObjectLike(null)).to.equal(false);
		expect(p.isObjectLike(undefined)).to.equal(false);
		expect(p.isObjectLike('hello')).to.equal(false);
		expect(p.isObjectLike(10)).to.equal(false);
	});

	it('object', () => {
		expect(p.isObject({ foo: 'bar' })).to.equal(true);
		expect(p.isObject([])).to.equal(false);
		expect(p.isObject(null)).to.equal(false);
		expect(p.isObject(undefined)).to.equal(false);
		expect(p.isObject('hello')).to.equal(false);
		expect(p.isObject(10)).to.equal(false);
	});

	it('set', () => {
		expect(p.isSet(42)).to.equal(true);
		expect(p.isSet(true)).to.equal(true);
		expect(p.isSet(false)).to.equal(true);
		expect(p.isSet('foo')).to.equal(true);
		expect(p.isSet(Symbol('Testing symbol'))).to.equal(true);
		expect(p.isSet(null)).to.equal(false);
		expect(p.isSet(undefined)).to.equal(false);
		expect(p.isSet([])).to.equal(true);
		expect(p.isSet({})).to.equal(true);
	});

	it('numericalEnumeration', () => {
		enum NumEnum {
			READ = 1,
			WRITE = 2,
			EXECUTE = 4,
		}

		const isNumEnum = p.isNumericalEnumeration(NumEnum);
		expect(isNumEnum(NumEnum.READ)).to.equal(true);
		expect(isNumEnum(NumEnum.WRITE)).to.equal(true);
		expect(isNumEnum(NumEnum.EXECUTE)).to.equal(true);
		expect(isNumEnum(NumEnum.READ | NumEnum.WRITE)).to.equal(false);
		expect(isNumEnum(0)).to.equal(false);
		expect(isNumEnum(2)).to.equal(true);
		expect(isNumEnum(3)).to.equal(false);
		expect(isNumEnum(8)).to.equal(false);
		expect(isNumEnum('READ')).to.equal(false);
		expect(isNumEnum(null)).to.equal(false);

		const isNumFlag = p.isNumericalEnumeration(NumEnum, true);
		expect(isNumFlag(NumEnum.READ)).to.equal(true);
		expect(isNumFlag(NumEnum.WRITE)).to.equal(true);
		expect(isNumFlag(NumEnum.EXECUTE)).to.equal(true);
		expect(isNumFlag(NumEnum.READ | NumEnum.WRITE)).to.equal(true);
		expect(isNumFlag(0)).to.equal(false);
		expect(isNumFlag(2)).to.equal(true);
		expect(isNumFlag(3)).to.equal(true);
		expect(isNumFlag(8)).to.equal(false);
		expect(isNumFlag('READ')).to.equal(false);
		expect(isNumFlag(null)).to.equal(false);
	});

	it('stringEnumeration', () => {
		enum StringEnum {
			Foo = 'FOO',
			Bar = 'BAR',
		}

		const isStringEnum = p.isStringEnumeration(StringEnum);
		expect(isStringEnum(StringEnum.Foo)).to.equal(true);
		expect(isStringEnum(StringEnum.Bar)).to.equal(true);
		expect(isStringEnum('FOO')).to.equal(true);
		expect(isStringEnum('BAR')).to.equal(true);
		expect(isStringEnum('Foo')).to.equal(false);
		expect(isStringEnum('Bar')).to.equal(false);
		expect(isStringEnum(false)).to.equal(false);
		expect(isStringEnum(null)).to.equal(false);
	});

	it('any', () => {
		expect(p.isAny(true)).to.equal(true);
		expect(p.isAny('')).to.equal(true);
		expect(p.isAny(50)).to.equal(true);
		expect(p.isAny(null)).to.equal(true);
		expect(p.isAny(undefined)).to.equal(true);
		expect(p.isAny([])).to.equal(true);
		expect(p.isAny({})).to.equal(true);
	});

	it('never', () => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
		const fn: Function = p.isNever;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
		expect(() => fn('Oops!')).to.throw('Unexpected value when expecting never: Oops!');
	});
});
