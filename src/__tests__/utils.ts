/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { afterEach, describe, expect, it } from '@jest/globals';
import { assert, AssertionError, combine } from '../utils.js';
import { isNumber, isObject } from '../primitives.js';
import { hasProperties } from '../objects.js';
import { reset } from 'testdouble';

/**
 * Tests for the utils functions.
 */
describe('utils', () => {
	afterEach(() => {
		reset();
	});

	describe('assertionError', () => {
		it('works as an exception', () => {
			expect(() => {
				throw new AssertionError({});
			}).toThrow(RangeError);
			expect(() => {
				throw new AssertionError({}, 'Hello world');
			}).toThrow(RangeError);
		});
	});

	describe('#assert', () => {
		const dummyGuard
			= (ret: boolean) =>
				(_o: unknown): _o is string =>
					ret;

		// eslint-disable-next-line jest/expect-expect
		it('test success', () => {
			assert('foo', dummyGuard(true));
		});

		it('failures throw exceptions', () => {
			expect(() => assert('foo', dummyGuard(false))).toThrow(RangeError);
		});

		it('failures throw exceptions with custom message', () => {
			expect(() => assert('foo', dummyGuard(false), 'Hello world')).toThrow(RangeError);
		});
	});

	describe('#combine', () => {
		it('combines two assertions', () => {
			const hasLength = hasProperties({
				length: isNumber,
			});
			const isCool = combine(isObject, hasLength);

			expect(isCool({ length: 10 })).toBe(true);
			expect(isCool({ hello: 'world' })).toBe(false);
			// arrays are object type but not objects for isObject
			expect(hasLength([])).toBe(true);
			expect(isCool([])).toBe(false);
		});
	});
});
