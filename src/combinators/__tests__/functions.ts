/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as c from '../functions.js';
import * as o from '../../objects.js';
import * as p from '../../primitives.js';
import { describe, expect, it } from '@jest/globals';
import type { PartialTypeGuard } from '../../guards.js';

interface SimpleInterface {
	str: string;
	num: number;
}

/**
 * Compilation tests for the combinator types.
 */
describe('combinators', () => {
	it('unionStringNumber', () => {
		const isStringOrNumber = c.isUnion(p.isNumber, p.isString);

		expect(isStringOrNumber('foo')).toBe(true);
		expect(isStringOrNumber(5)).toBe(true);
		expect(isStringOrNumber(null)).toBe(false);
	});

	it('intersectionObject', () => {
		const isInterface: PartialTypeGuard<object, SimpleInterface> = c.isIntersection(
			o.hasProperty('str', p.isString),
			o.hasProperty('num', p.isNumber),
		);

		expect(isInterface({ str: 'foo', num: 10 })).toBe(true);
		expect(isInterface({ str: 'foo' })).toBe(false);
		expect(isInterface({ num: 10 })).toBe(false);
	});
});
