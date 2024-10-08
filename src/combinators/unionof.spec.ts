/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as p from '../primitives.js';
import { expect } from 'chai';
import type { TypeGuard } from '../guards.js';
import { UnionOf } from './unionof.js';

/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * Compilation tests for the UnionOf spec.
 */
describe('UnionOf', function (this: Mocha.Suite) {
	this.slow(5).timeout(3000);

	it('unionStringNumber', () => {
		const isNullableStringOrNumber: TypeGuard<string | number | null> = new UnionOf(p.isString)
			.with(p.isNumber)
			.with(p.isNull)
			.get();
		expect(isNullableStringOrNumber('foo')).to.equal(true);
		expect(isNullableStringOrNumber(10)).to.equal(true);
		expect(isNullableStringOrNumber(null)).to.equal(true);
		expect(isNullableStringOrNumber(undefined)).to.equal(false);
	});
});
