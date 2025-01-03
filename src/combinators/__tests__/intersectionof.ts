/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as o from '../../objects.js';
import * as p from '../../primitives.js';
import { describe, expect, it } from '@jest/globals';
import { IntersectionOf } from '../intersectionof.js';
import type { PartialTypeGuard } from '../../guards.js';

interface SimpleInterface {
	str: string;
	num: number;
	b: boolean;
}

/**
 * Compilation tests for the IntersectionOf class.
 */
describe('intersectionOf', () => {
	// This class is a wrapper around isUnion, most of the real tests happen there.
	it('unionStringNumber', () => {
		const isSimpleInterface: PartialTypeGuard<object, SimpleInterface> = new IntersectionOf(
			o.hasProperty('str', p.isString),
		)
			.with(o.hasProperty('num', p.isNumber))
			.with(o.hasProperty('b', p.isBoolean))
			.get();
		expect(isSimpleInterface({ str: 'foo', num: 10, b: false })).toBe(true);
		expect(isSimpleInterface({})).toBe(false);
	});
});
