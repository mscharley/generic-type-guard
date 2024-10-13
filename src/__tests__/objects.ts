/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as c from '../combinators/index.js';
import * as o from '../objects.js';
import * as p from '../primitives.js';
import { describe, expect, it } from '@jest/globals';
import { DummyClass, FullDummyClass } from '../__utils__/dummy_classes.js';

/**
 * Compilation tests for the guard types.
 */
describe('objects', () => {
	it('record', () => {
		const hasFooString = o.isRecord('foo', p.isString);
		expect(hasFooString({ foo: 'bar' })).toBe(true);
		expect(hasFooString({ foo: 10 })).toBe(false);
		expect(hasFooString({})).toBe(false);
		expect(hasFooString({ bar: 'foo' })).toBe(false);
		expect(hasFooString(10)).toBe(false);
		expect(hasFooString('foo')).toBe(false);
	});

	it('optionalProperty', () => {
		const hasFooString = o.hasOptionalProperty('foo', p.isString);
		expect(hasFooString({ foo: 'bar' })).toBe(true);
		expect(hasFooString({ foo: 10 })).toBe(false);
		expect(hasFooString({})).toBe(true);
		expect(hasFooString({ bar: 'foo' })).toBe(true);
	});

	it('property', () => {
		const hasFooString = o.hasProperty('foo', p.isString);
		expect(hasFooString({ foo: 'bar' })).toBe(true);
		expect(hasFooString({ foo: 10 })).toBe(false);
		expect(hasFooString({})).toBe(false);
		expect(hasFooString({ bar: 'foo' })).toBe(false);
	});

	it('propertyOfBaseClass', () => {
		const hasFooString = o.hasProperty('foo', p.isString);
		expect(hasFooString(new FullDummyClass())).toBe(true);
	});

	it('propertyUndefined', () => {
		const hasMaybeFooString = o.hasProperty('foo', c.isUnion(p.isUndefined, p.isString));
		expect(hasMaybeFooString({ foo: 'bar' })).toBe(true);
		expect(hasMaybeFooString({})).toBe(true);
		expect(hasMaybeFooString({ bar: 'foo' })).toBe(true);
	});

	it('stringIndex', () => {
		const hasStringStringIndex = o.hasStringIndexSignature(p.isString);
		expect(hasStringStringIndex({})).toBe(false);
		expect(hasStringStringIndex([])).toBe(false);
		expect(hasStringStringIndex({ foo: 'bar' })).toBe(true);
		expect(hasStringStringIndex(['foo'])).toBe(false);
		expect(hasStringStringIndex({ 0: 'bar' })).toBe(false);
		expect(hasStringStringIndex({ foo: 'bar', bar: 10 })).toBe(false);
		expect(hasStringStringIndex(['foo', 10])).toBe(false);
	});

	it('looseStringIndex', () => {
		const hasStringStringIndex = o.hasStringIndexSignature(p.isString, false);
		expect(hasStringStringIndex({})).toBe(true);
		expect(hasStringStringIndex([])).toBe(true);
		expect(hasStringStringIndex({ foo: 'bar' })).toBe(true);
		expect(hasStringStringIndex(['foo'])).toBe(true);
		expect(hasStringStringIndex({ 0: 'bar' })).toBe(true);
		expect(hasStringStringIndex({ foo: 'bar', bar: 10 })).toBe(false);
		expect(hasStringStringIndex(['foo', 10])).toBe(true);
	});

	it('numberIndex', () => {
		const hasNumberStringIndex = o.hasNumericIndexSignature(p.isString);
		expect(hasNumberStringIndex({})).toBe(false);
		expect(hasNumberStringIndex([])).toBe(false);
		expect(hasNumberStringIndex({ foo: 'bar' })).toBe(false);
		expect(hasNumberStringIndex(['foo'])).toBe(true);
		expect(hasNumberStringIndex({ 0: 'bar' })).toBe(true);
		expect(hasNumberStringIndex({ foo: 'bar', bar: 10 })).toBe(false);
		expect(hasNumberStringIndex(['foo', 10])).toBe(false);
	});

	it('looseNumberIndex', () => {
		const hasNumberStringIndex = o.hasNumericIndexSignature(p.isString, false);
		expect(hasNumberStringIndex({})).toBe(true);
		expect(hasNumberStringIndex([])).toBe(true);
		expect(hasNumberStringIndex({ foo: 'bar' })).toBe(true);
		expect(hasNumberStringIndex(['foo'])).toBe(true);
		expect(hasNumberStringIndex({ 0: 'bar' })).toBe(true);
		expect(hasNumberStringIndex({ foo: 'bar', bar: 10 })).toBe(true);
		expect(hasNumberStringIndex(['foo', 10])).toBe(false);
	});

	it('instance', () => {
		const isDummyClass = o.isInstance(DummyClass);
		expect(isDummyClass(new DummyClass())).toBe(true);
		// Basic objects should not work.
		expect(isDummyClass({})).toBe(false);
		// Objects that are structurally similar should not work.
		expect(isDummyClass({ foo: 'bar' })).toBe(false);
		expect(isDummyClass('foo')).toBe(false);

		class DummyWithConstructor {
			public constructor(public arg: string) {}
		}
		const isDummyWithConstructor = o.isInstance(DummyWithConstructor);
		expect(isDummyWithConstructor(new DummyWithConstructor('Hello world!'))).toBe(true);
	});

	it('optionalProperties', () => {
		const hasProps = o.hasOptionalProperties({
			foo: p.isString,
			bar: p.isNumber,
		});
		expect(hasProps({ foo: 'foo', bar: 1 })).toBe(true);
		expect(hasProps({ foo: 'foo' })).toBe(true);
		expect(hasProps({ foo: 'foo', bar: '1' })).toBe(false);
	});

	it('properties', () => {
		const hasProps = o.hasProperties({ foo: p.isString, bar: p.isNumber });
		expect(hasProps({ foo: 'foo', bar: 1 })).toBe(true);
		expect(hasProps({ foo: 'foo', bar: 1, baz: false })).toBe(true);
		expect(hasProps({ foo: 'foo' })).toBe(false);
		expect(hasProps({ foo: 'foo', bar: '1' })).toBe(false);
	});

	it('onlyProperties', () => {
		const hasOnlyProps = o.hasOnlyProperties({
			foo: p.isString,
			bar: p.isNumber,
		});
		expect(hasOnlyProps({ foo: 'foo', bar: 1 })).toBe(true);
		expect(hasOnlyProps({ foo: 'foo', bar: 1, baz: false })).toBe(false);
		expect(hasOnlyProps({ foo: 'foo' })).toBe(false);
		expect(hasOnlyProps({ foo: 'foo', bar: '1' })).toBe(false);
	});

	describe('#likeObject', () => {
		it('checks for sufficient properties', () => {
			const isObjectWithLength = o.isLikeObject({
				length: p.isNumber,
			});

			expect(isObjectWithLength({ length: 10 })).toBe(true);
			expect(isObjectWithLength({ length: 10, foo: 'bar' })).toBe(true);
			expect(isObjectWithLength({ hello: 'world' })).toBe(false);
			// arrays are object type but not objects for isObject
			expect(isObjectWithLength([])).toBe(false);
		});
	});

	describe('#exactObject', () => {
		it('checks for exactly the properties specified', () => {
			const isObjectWithLength = o.isExactObject({
				length: p.isNumber,
			});

			expect(isObjectWithLength({ length: 10 })).toBe(true);
			expect(isObjectWithLength({ length: 10, foo: 'bar' })).toBe(false);
			expect(isObjectWithLength({ hello: 'world' })).toBe(false);
			// arrays are object type but not objects for isObject
			expect(isObjectWithLength([])).toBe(false);
		});
	});
});
