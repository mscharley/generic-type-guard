import * as c from './combinators/index.js';
import * as o from './objects.js';
import * as p from './primitives.js';
import { DummyClass, FullDummyClass } from './dummy_classes.spec.js';
import { expect } from 'chai';

/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * Compilation tests for the guard types.
 */
describe('Objects', function (this: Mocha.Suite) {
	this.slow(5).timeout(3000);

	it('record', () => {
		const hasFooString = o.isRecord('foo', p.isString);
		expect(hasFooString({ foo: 'bar' })).to.equal(true);
		expect(hasFooString({ foo: 10 })).to.equal(false);
		expect(hasFooString({})).to.equal(false);
		expect(hasFooString({ bar: 'foo' })).to.equal(false);
		expect(hasFooString(10)).to.equal(false);
		expect(hasFooString('foo')).to.equal(false);
	});

	it('optionalProperty', () => {
		const hasFooString = o.hasOptionalProperty('foo', p.isString);
		expect(hasFooString({ foo: 'bar' }), 'correct').to.equal(true);
		expect(hasFooString({ foo: 10 }), 'invalid number').to.equal(false);
		expect(hasFooString({}), 'missing value').to.equal(true);
		expect(hasFooString({ bar: 'foo' }), 'different property').to.equal(true);
	});

	it('property', () => {
		const hasFooString = o.hasProperty('foo', p.isString);
		expect(hasFooString({ foo: 'bar' }), 'correct').to.equal(true);
		expect(hasFooString({ foo: 10 }), 'invalid number').to.equal(false);
		expect(hasFooString({}), 'missing value').to.equal(false);
		expect(hasFooString({ bar: 'foo' }), 'different property').to.equal(false);
	});

	it('propertyOfBaseClass', () => {
		const hasFooString = o.hasProperty('foo', p.isString);
		expect(hasFooString(new FullDummyClass())).to.equal(true);
	});

	it('propertyUndefined', () => {
		const hasMaybeFooString = o.hasProperty('foo', c.isUnion(p.isUndefined, p.isString));
		expect(hasMaybeFooString({ foo: 'bar' })).to.equal(true);
		expect(hasMaybeFooString({})).to.equal(true);
		expect(hasMaybeFooString({ bar: 'foo' })).to.equal(true);
	});

	it('stringIndex', () => {
		const hasStringStringIndex = o.hasStringIndexSignature(p.isString);
		expect(hasStringStringIndex({})).to.equal(false, 'empty string index');
		expect(hasStringStringIndex([])).to.equal(false, 'empty array index');
		expect(hasStringStringIndex({ foo: 'bar' })).to.equal(true, 'string index');
		expect(hasStringStringIndex(['foo'])).to.equal(false, 'numeric index');
		expect(hasStringStringIndex({ 0: 'bar' })).to.equal(false, 'fake numeric index');
		expect(hasStringStringIndex({ foo: 'bar', bar: 10 })).to.equal(false, 'string index with number');
		expect(hasStringStringIndex(['foo', 10])).to.equal(false, 'numeric index with number');
	});

	it('looseStringIndex', () => {
		const hasStringStringIndex = o.hasStringIndexSignature(p.isString, false);
		expect(hasStringStringIndex({})).to.equal(true, 'empty string index');
		expect(hasStringStringIndex([])).to.equal(true, 'empty array index');
		expect(hasStringStringIndex({ foo: 'bar' })).to.equal(true, 'string index');
		expect(hasStringStringIndex(['foo'])).to.equal(true, 'numeric index');
		expect(hasStringStringIndex({ 0: 'bar' })).to.equal(true, 'fake numeric index');
		expect(hasStringStringIndex({ foo: 'bar', bar: 10 })).to.equal(false, 'string index with number');
		expect(hasStringStringIndex(['foo', 10])).to.equal(true, 'numeric index with number');
	});

	it('numberIndex', () => {
		const hasNumberStringIndex = o.hasNumericIndexSignature(p.isString);
		expect(hasNumberStringIndex({})).to.equal(false, 'empty string index');
		expect(hasNumberStringIndex([])).to.equal(false, 'empty array index');
		expect(hasNumberStringIndex({ foo: 'bar' })).to.equal(false, 'string index');
		expect(hasNumberStringIndex(['foo'])).to.equal(true, 'numeric index');
		expect(hasNumberStringIndex({ 0: 'bar' })).to.equal(true, 'fake numeric index');
		expect(hasNumberStringIndex({ foo: 'bar', bar: 10 })).to.equal(false, 'string index with number');
		expect(hasNumberStringIndex(['foo', 10])).to.equal(false, 'numeric index with number');
	});

	it('looseNumberIndex', () => {
		const hasNumberStringIndex = o.hasNumericIndexSignature(p.isString, false);
		expect(hasNumberStringIndex({})).to.equal(true, 'empty string index');
		expect(hasNumberStringIndex([])).to.equal(true, 'empty array index');
		expect(hasNumberStringIndex({ foo: 'bar' })).to.equal(true, 'string index');
		expect(hasNumberStringIndex(['foo'])).to.equal(true, 'numeric index');
		expect(hasNumberStringIndex({ 0: 'bar' })).to.equal(true, 'fake numeric index');
		expect(hasNumberStringIndex({ foo: 'bar', bar: 10 })).to.equal(true, 'string index with number');
		expect(hasNumberStringIndex(['foo', 10])).to.equal(false, 'numeric index with number');
	});

	it('instance', () => {
		const isDummyClass = o.isInstance(DummyClass);
		expect(isDummyClass(new DummyClass())).to.equal(true);
		// Basic objects should not work.
		expect(isDummyClass({})).to.equal(false);
		// Objects that are structurally similar should not work.
		expect(isDummyClass({ foo: 'bar' })).to.equal(false);
		expect(isDummyClass('foo')).to.equal(false);

		class DummyWithConstructor {
			public constructor(public arg: string) {}
		}
		const isDummyWithConstructor = o.isInstance(DummyWithConstructor);
		expect(isDummyWithConstructor(new DummyWithConstructor('Hello world!'))).to.equal(true);
	});

	it('optionalProperties', () => {
		const hasProps = o.hasOptionalProperties({
			foo: p.isString,
			bar: p.isNumber,
		});
		expect(hasProps({ foo: 'foo', bar: 1 })).to.equal(true);
		expect(hasProps({ foo: 'foo' })).to.equal(true);
		expect(hasProps({ foo: 'foo', bar: '1' })).to.equal(false);
	});

	it('properties', () => {
		const hasProps = o.hasProperties({ foo: p.isString, bar: p.isNumber });
		expect(hasProps({ foo: 'foo', bar: 1 })).to.equal(true);
		expect(hasProps({ foo: 'foo', bar: 1, baz: false })).to.equal(true);
		expect(hasProps({ foo: 'foo' })).to.equal(false);
		expect(hasProps({ foo: 'foo', bar: '1' })).to.equal(false);
	});

	it('onlyProperties', () => {
		const hasOnlyProps = o.hasOnlyProperties({
			foo: p.isString,
			bar: p.isNumber,
		});
		expect(hasOnlyProps({ foo: 'foo', bar: 1 })).to.equal(true);
		expect(hasOnlyProps({ foo: 'foo', bar: 1, baz: false })).to.equal(false);
		expect(hasOnlyProps({ foo: 'foo' })).to.equal(false);
		expect(hasOnlyProps({ foo: 'foo', bar: '1' })).to.equal(false);
	});

	describe('#likeObject', () => {
		it('checks for sufficient properties', () => {
			const isObjectWithLength = o.isLikeObject({
				length: p.isNumber,
			});

			expect(isObjectWithLength({ length: 10 })).to.equal(true);
			expect(isObjectWithLength({ length: 10, foo: 'bar' })).to.equal(true);
			expect(isObjectWithLength({ hello: 'world' })).to.equal(false);
			// arrays are object type but not objects for isObject
			expect(isObjectWithLength([])).to.equal(false);
		});
	});

	describe('#exactObject', () => {
		it('checks for exactly the properties specified', () => {
			const isObjectWithLength = o.isExactObject({
				length: p.isNumber,
			});

			expect(isObjectWithLength({ length: 10 })).to.equal(true);
			expect(isObjectWithLength({ length: 10, foo: 'bar' })).to.equal(false);
			expect(isObjectWithLength({ hello: 'world' })).to.equal(false);
			// arrays are object type but not objects for isObject
			expect(isObjectWithLength([])).to.equal(false);
		});
	});
});
