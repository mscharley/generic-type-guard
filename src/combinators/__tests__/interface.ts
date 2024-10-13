/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as o from '../../objects.js';
import * as p from '../../primitives.js';
import { describe, expect, it } from '@jest/globals';
import { FullDummyClass } from '../../__utils__/dummy_classes.js';
import { IsInterface } from '../interface.js';
import type { LargeInterface } from '../../__utils__/dummy_classes.js';
import type { TypeGuard } from '../../guards.js';

/**
 * Compilation tests for the IsInterface class.
 */
describe('interface', () => {
	// This class is a wrapper around isUnion, most of the real tests happen there.
	it('interface', () => {
		const isSimpleInterface = new IsInterface()
			.withProperty('str', p.isString)
			.withProperty('num', p.isNumber)
			.withProperty('b', p.isBoolean)
			.with(o.hasProperty('n', p.isNull))
			.get();
		expect(isSimpleInterface({ str: 'foo', num: 10, b: false, n: null })).toBe(true);
		expect(isSimpleInterface({ str: 'foo', num: 10, n: null })).toBe(false);
		expect(isSimpleInterface({ str: 'foo', num: 'foo', b: false, n: null })).toBe(false);
		expect(isSimpleInterface(10)).toBe(false);
	});

	it('optionalInterface', () => {
		const isSimpleInterface = new IsInterface()
			.withOptionalProperty('str', p.isString)
			.withOptionalProperty('num', p.isNumber)
			.withOptionalProperty('b', p.isBoolean)
			.with(o.hasOptionalProperty('n', p.isNull))
			.get();
		expect(isSimpleInterface({ str: 'foo', num: 10, b: false, n: null })).toBe(true);
		expect(isSimpleInterface({ str: 'foo', num: 10 })).toBe(true);
		expect(isSimpleInterface({ str: 'foo', num: 'foo', b: false, n: null })).toBe(false);
		expect(isSimpleInterface(10)).toBe(false);
	});

	it('classImplementsInterface', () => {
		const isLargeInterface: TypeGuard<LargeInterface> = new IsInterface()
			.with(o.hasProperty('foo', p.isString))
			.withProperty('bar', p.isNumber)
			.withProperty('active', p.isBoolean)
			.get();
		expect(isLargeInterface(new FullDummyClass())).toBe(true);
	});

	it('stringIndex', () => {
		const isObject: TypeGuard<Record<string, number>> = new IsInterface().withStringIndexSignature(p.isNumber).get();
		const isLooseObject: TypeGuard<Record<string, number>> = new IsInterface()
			.withStringIndexSignature(p.isNumber, false)
			.get();
		expect(isObject({ one: 1, two: 2, three: 3 })).toBe(true);
		expect(isObject({})).toBe(false);
		expect(isLooseObject({})).toBe(true);
	});

	it('numberIndex', () => {
		const isArrayLike: TypeGuard<Record<number, string>> = new IsInterface()
			.withNumericIndexSignature(p.isString)
			.get();
		const isLooseArrayLike: TypeGuard<Record<number, string>> = new IsInterface()
			.withNumericIndexSignature(p.isString, false)
			.get();
		expect(isArrayLike(['one', 'two', 'three'])).toBe(true);
		expect(isArrayLike([])).toBe(false);
		expect(isLooseArrayLike([])).toBe(true);
	});

	it('combinedIndex', () => {
		const isWeirdArray: TypeGuard<{
			[prop: number]: string;
			foo: string;
		}> = new IsInterface().withProperty('foo', p.isString).withNumericIndexSignature(p.isString).get();
		const isLooselyWeirdArray: TypeGuard<{
			[prop: number]: string;
			foo: string;
		}> = new IsInterface().withProperty('foo', p.isString).withNumericIndexSignature(p.isString, false).get();
		const isWeirdObject: TypeGuard<{
			[prop: string]: string;
			0: string;
		}> = new IsInterface().withProperty('0', p.isString).withStringIndexSignature(p.isString).get();
		const isLooselyWeirdObject: TypeGuard<{
			[prop: string]: string;
			0: string;
		}> = new IsInterface().withProperty('0', p.isString).withStringIndexSignature(p.isString, false).get();
		expect(isWeirdArray({ 0: 'foo', foo: 'bar' })).toBe(true);
		expect(isWeirdArray({ foo: 'bar' })).toBe(false);
		expect(isLooselyWeirdArray({ foo: 'bar' })).toBe(true);
		expect(isWeirdObject({ foo: 'bar', 0: 'baz' })).toBe(true);
		expect(isWeirdObject({ 0: 'baz' })).toBe(false);
		expect(isLooselyWeirdObject({ 0: 'baz' })).toBe(true);
	});

	it('emptyInterface', () => {
		const isEmptyInterface: TypeGuard<object> = new IsInterface().get();
		expect(isEmptyInterface({})).toBe(true);
		expect(isEmptyInterface({ foo: 'bar' })).toBe(true);
		expect(isEmptyInterface(10)).toBe(false);
	});

	it('withOptionalProperties', () => {
		const isSimpleInterface = new IsInterface()
			.withOptionalProperties({
				num: p.isNumber,
				str: p.isString,
			})
			.withOptionalProperties({
				b: p.isBoolean,
				n: p.isNull,
			})
			.get();
		expect(isSimpleInterface({ str: 'foo', num: 10, b: false, n: null })).toBe(true);
		expect(isSimpleInterface({ str: 'foo', num: 'foo', b: false, n: null })).toBe(false);
		expect(isSimpleInterface({ b: false, n: null })).toBe(true);
		expect(isSimpleInterface(10)).toBe(false);
	});

	it('withProperties', () => {
		const isSimpleInterface = new IsInterface()
			.withProperties({
				b: p.isBoolean,
				n: p.isNull,
			})
			.withProperties({
				num: p.isNumber,
				str: p.isString,
			})
			.get();
		expect(isSimpleInterface({ str: 'foo', num: 10, b: false, n: null })).toBe(true);
		expect(isSimpleInterface({ str: 'foo', num: 'foo', b: false, n: null })).toBe(false);
		expect(isSimpleInterface({ str: 'foo', num: 10, b: false })).toBe(false);
		expect(isSimpleInterface(10)).toBe(false);
	});
});
