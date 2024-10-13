/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as p from '../../primitives.js';
import { describe, expect, it } from '@jest/globals';
import type { TypeGuard } from '../../guards.js';
import { UnionOf } from '../unionof.js';

/**
 * Compilation tests for the UnionOf spec.
 */
describe('unionOf', () => {
	it('unionStringNumber', () => {
		const isNullableStringOrNumber: TypeGuard<string | number | null> = new UnionOf(p.isString)
			.with(p.isNumber)
			.with(p.isNull)
			.get();
		expect(isNullableStringOrNumber('foo')).toBe(true);
		expect(isNullableStringOrNumber(10)).toBe(true);
		expect(isNullableStringOrNumber(null)).toBe(true);
		expect(isNullableStringOrNumber(undefined)).toBe(false);
	});
});
