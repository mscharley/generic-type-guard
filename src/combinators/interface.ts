import * as o from '../objects';
import type { MappedTypeGuard, PartialTypeGuard, TypeGuard } from '../guards';
import { isIntersection } from './functions';
import { isObjectLike } from '../primitives';

// tslint:disable:max-classes-per-file

/**
 * Fluent Builder pattern for creating guards for interface types.
 *
 * @public
 */
export interface InterfaceBuilder<T extends object> {
	/**
	 * Finalise and return the type guard which has been built.
	 */
	get: () => TypeGuard<T>;

	/**
	 * Add a free-form type guard to this interface as a union.
	 */
	with: <V extends object>(ptv: PartialTypeGuard<object, V>) => InterfaceBuilder<T & V>;

	/**
	 * Add a single property to the interface.
	 *
	 * @param key - The string key of the property.
	 * @param ptv - The type guard for this property.
	 */
	withProperty: <K extends string, V>(key: K, ptv: TypeGuard<V>) => InterfaceBuilder<T & { [prop in K]: V }>;

	/**
	 * Add a single optional property to the interface.
	 *
	 * @param key - The string key of the property.
	 * @param ptv - The type guard for this property.
	 */
	withOptionalProperty: <K extends string, V>(key: K, ptv: TypeGuard<V>) => InterfaceBuilder<T & { [prop in K]?: V }>;

	/**
	 * Add a string index signature to the interface.
	 *
	 * @param value - The type guard for values accessed by the index signature.
	 * @param enforce - Whether to enforce that there is at least one property already set. Be careful setting this to
	 *   false, you will get some unexpected outputs, for instance arrays will have a string index signature.
	 */
	withStringIndexSignature: <V>(value: TypeGuard<V>, enforce?: boolean) => InterfaceBuilder<T & Record<string, V>>;

	/**
	 * Add a numeric index signature to the interface.
	 *
	 * @param value - The type guard for values accessed by the index signature.
	 * @param enforce - Whether to enforce that there is at least one property already set. Be careful setting this to
	 *   false, you will get some unexpected outputs, for instance arrays will have a string index signature.
	 */
	withNumericIndexSignature: <V>(value: TypeGuard<V>, enforce?: boolean) => InterfaceBuilder<T & Record<number, V>>;

	/**
	 * Add many properties to the interface at once.
	 *
	 * @param props - A map of properties to guards to apply to the interface.
	 */
	withProperties: <V extends object>(props: MappedTypeGuard<V>) => InterfaceBuilder<T & V>;

	/**
	 * Add many optional properties to the interface at once.
	 *
	 * @param props - A map of properties to guards to apply to the interface.
	 */
	withOptionalProperties: <V extends object>(props: MappedTypeGuard<V>) => InterfaceBuilder<T & Partial<V>>;
}

/**
 * Internal class used to represent each step in the building process.
 */
class InterfaceStep<T extends object> implements InterfaceBuilder<T> {
	private readonly ptt: PartialTypeGuard<object, T>;

	public constructor(ptt: PartialTypeGuard<object, T>) {
		this.ptt = ptt;
	}

	public get(): TypeGuard<T> {
		return (obj): obj is T => isObjectLike(obj) && this.ptt(obj);
	}

	public with<V extends object>(ptv: PartialTypeGuard<object, V>): InterfaceBuilder<T & V> {
		return new InterfaceStep<T & V>(isIntersection(this.ptt, ptv));
	}

	public withProperty<K extends string, V>(key: K, ptv: TypeGuard<V>): InterfaceBuilder<T & Record<K, V>> {
		return new InterfaceStep(isIntersection(this.ptt, o.hasProperty(key, ptv)));
	}

	public withOptionalProperty<K extends string, V>(
		key: K,
		ptv: TypeGuard<V>,
	): InterfaceBuilder<T & { [prop in K]?: V }> {
		return new InterfaceStep(isIntersection(this.ptt, o.hasOptionalProperty(key, ptv)));
	}

	public withStringIndexSignature<V>(value: TypeGuard<V>, enforce = true): InterfaceBuilder<T & Record<string, V>> {
		return new InterfaceStep(isIntersection(this.ptt, o.hasStringIndexSignature(value, enforce)));
	}

	public withNumericIndexSignature<V>(value: TypeGuard<V>, enforce = true): InterfaceBuilder<T & Record<number, V>> {
		return new InterfaceStep(isIntersection(this.ptt, o.hasNumericIndexSignature(value, enforce)));
	}

	public withProperties<V extends object>(props: MappedTypeGuard<V>): InterfaceBuilder<T & V> {
		return new InterfaceStep(isIntersection(this.ptt, o.hasProperties(props)));
	}

	public withOptionalProperties<V extends object>(props: MappedTypeGuard<V>): InterfaceBuilder<T & Partial<V>> {
		return new InterfaceStep(isIntersection(this.ptt, o.hasOptionalProperties(props)));
	}
}

/**
 * A small class to help with constructing interface guards.
 *
 * @public
 */
export class IsInterface implements InterfaceBuilder<object> {
	public get(): TypeGuard<object> {
		return isObjectLike;
	}

	public with<V extends object>(ptv: PartialTypeGuard<object, V>): InterfaceBuilder<V> {
		return new InterfaceStep(ptv);
	}

	public withProperty<K extends string, V>(key: K, ptv: TypeGuard<V>): InterfaceBuilder<Record<K, V>> {
		return new InterfaceStep(o.hasProperty(key, ptv));
	}

	public withOptionalProperty<K extends string, V>(
		key: K,
		ptv: TypeGuard<V>,
	): InterfaceBuilder<object & { [prop in K]?: V }> {
		return new InterfaceStep(o.hasOptionalProperty(key, ptv));
	}

	public withStringIndexSignature<V>(value: TypeGuard<V>, enforce = true): InterfaceBuilder<Record<string, V>> {
		return new InterfaceStep(o.hasStringIndexSignature(value, enforce));
	}

	public withNumericIndexSignature<V>(value: TypeGuard<V>, enforce = true): InterfaceBuilder<Record<number, V>> {
		return new InterfaceStep(o.hasNumericIndexSignature(value, enforce));
	}

	public withProperties<V extends object>(props: MappedTypeGuard<V>): InterfaceBuilder<object & V> {
		return new InterfaceStep(o.hasProperties(props));
	}

	public withOptionalProperties<V extends object>(props: MappedTypeGuard<V>): InterfaceBuilder<object & Partial<V>> {
		return new InterfaceStep(o.hasOptionalProperties(props));
	}
}
