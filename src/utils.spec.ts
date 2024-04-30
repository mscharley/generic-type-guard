import { assert, AssertionError, combine } from './utils.js';
import { isNumber, isObject } from './primitives.js';
import { expect } from 'chai';
import { hasProperties } from './objects.js';
import { reset } from 'testdouble';

/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * Tests for the utils functions.
 */
describe('utils', function (this: Mocha.Suite): void {
	this.slow(5).timeout(300);

	afterEach(() => {
		reset();
	});

	describe('AssertionError', () => {
		it('works as an exception', () => {
			expect(() => {
				throw new AssertionError({});
			}).to.throw(RangeError);
			expect(() => {
				throw new AssertionError({}, 'Hello world');
			}).to.throw(RangeError, 'Hello world');
		});
	});

	describe('#assert', () => {
		const dummyGuard
			= (ret: boolean) =>
				(_o: unknown): _o is string =>
					ret;

		it('test success', () => {
			assert('foo', dummyGuard(true));
		});

		it('failures throw exceptions', () => {
			expect(() => assert('foo', dummyGuard(false))).to.throw(RangeError, 'Invalid value provided: "foo"');
		});

		it('failures throw exceptions with custom message', () => {
			expect(() => assert('foo', dummyGuard(false), 'Hello world')).to.throw(RangeError, 'Hello world');
		});
	});

	describe('#combine', () => {
		it('combines two assertions', () => {
			const hasLength = hasProperties({
				length: isNumber,
			});
			const isCool = combine(isObject, hasLength);

			expect(isCool({ length: 10 })).to.equal(true);
			expect(isCool({ hello: 'world' })).to.equal(false);
			// arrays are object type but not objects for isObject
			expect(hasLength([])).to.equal(true);
			expect(isCool([])).to.equal(false);
		});
	});
});
