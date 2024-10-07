/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/* eslint-disable @typescript-eslint/no-magic-numbers */

export interface LargeInterface {
	foo: string;
	bar: number;
	active: boolean;
}

/**
 * Dummy class definition which can be used by the object tests.
 */
export class DummyClass {
	public foo: string = 'foo';
}

/**
 * Dummy class that implements an interface with a mixture of own properties and base properties.
 */
export class FullDummyClass extends DummyClass implements LargeInterface {
	public bar: number = 10;
	public active: boolean = true;
}
