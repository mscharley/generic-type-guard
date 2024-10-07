/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { isUnion } from './functions.js';
import type { PartialTypeGuard } from '../guards.js';

/**
 * A small class to help with constructing larger union checkers.
 *
 * @public
 */
export class UnionOf<B, T extends B> {
	private readonly ptt: PartialTypeGuard<B, T>;

	public constructor(ptt: PartialTypeGuard<B, T>) {
		this.ptt = ptt;
	}

	/**
	 * Finalise and return the partial type guard for this builder.
	 */
	public get(): PartialTypeGuard<B, T> {
		return this.ptt;
	}

	/**
	 * Add a new option for this union.
	 */
	public with<U extends B>(ptv: PartialTypeGuard<B, U>): UnionOf<B, T | U> {
		return new UnionOf(isUnion(this.ptt, ptv));
	}
}
