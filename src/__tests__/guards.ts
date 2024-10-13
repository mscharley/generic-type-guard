/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import type * as g from '../guards.js';
import { describe, expect, it } from '@jest/globals';

/**
 * Compilation tests for the guard types.
 */
describe('guards', () => {
	it('strToConstantType', () => {
		const fn: g.PartialTypeGuard<string, 'Hello'> = (s): s is 'Hello' => s === 'Hello';

		expect(fn('Hello')).toBe(true);
		expect(fn('Bye')).toBe(false);
	});

	it('typeGuardsArePartialGuards', () => {
		const fn: g.TypeGuard<'Hello'> = (s): s is 'Hello' => typeof s === 'string' && s === 'Hello';
		const fn2: g.PartialTypeGuard<unknown, 'Hello'> = fn;

		expect(fn2('Hello')).toBe(true);
	});
});
