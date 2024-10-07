/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import type { PartialTypeGuard } from '../guards.js';

/**
 * Check if a value is a union of two types.
 *
 * @public
 */
export const isUnion
	= <B, T extends B, U extends B>(ptt: PartialTypeGuard<B, T>, ptu: PartialTypeGuard<B, U>): PartialTypeGuard<B, T | U> =>
		(o: B): o is T | U =>
			ptt(o) || ptu(o);

/**
 * Check if a value is an intersection of two types.
 *
 * @public
 */
export const isIntersection
	= <B, T extends B, U extends B>(ptt: PartialTypeGuard<B, T>, ptu: PartialTypeGuard<B, U>): PartialTypeGuard<B, T & U> =>
		(o: B): o is T & U =>
			ptt(o) && ptu(o);
