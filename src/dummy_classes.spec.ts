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
