/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as c from './functions.js';
import * as o from '../objects.js';
import * as p from '../primitives.js';
import { expect } from 'chai';
import type { PartialTypeGuard } from '../guards.js';

/* eslint-disable @typescript-eslint/no-magic-numbers */

interface SimpleInterface {
	str: string;
	num: number;
}

/**
 * Compilation tests for the combinator types.
 */
describe('Combinators', function (this: Mocha.Suite) {
	this.slow(5).timeout(3000);

	it('unionStringNumber', () => {
		const isStringOrNumber = c.isUnion(p.isNumber, p.isString);

		expect(isStringOrNumber('foo')).to.equal(true);
		expect(isStringOrNumber(5)).to.equal(true);
		expect(isStringOrNumber(null)).to.equal(false);
	});

	it('intersectionObject', () => {
		const isInterface: PartialTypeGuard<object, SimpleInterface> = c.isIntersection(
			o.hasProperty('str', p.isString),
			o.hasProperty('num', p.isNumber),
		);

		expect(isInterface({ str: 'foo', num: 10 })).to.equal(true);
		expect(isInterface({ str: 'foo' })).to.equal(false);
		expect(isInterface({ num: 10 })).to.equal(false);
	});
});
