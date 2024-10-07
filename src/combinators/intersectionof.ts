/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { isIntersection } from './functions.js';
import type { PartialTypeGuard } from '../guards.js';

/**
 * A small class to help with constructing larger intersection checkers.
 *
 * @public
 */
export class IntersectionOf<B, T extends B> {
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
	 * Add a new option for this intersection.
	 */
	public with<U extends B>(ptu: PartialTypeGuard<B, U>): IntersectionOf<B, T & U> {
		return new IntersectionOf(isIntersection(this.ptt, ptu));
	}
}
