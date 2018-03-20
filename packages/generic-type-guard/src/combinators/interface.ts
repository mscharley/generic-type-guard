import { PartialTypeGuard, TypeGuard } from "../guards";
import * as o from "../objects";
import { isObjectLike } from "../primitives";
import { isIntersection } from "./functions";

// tslint:disable:max-classes-per-file

export interface InterfaceBuilder<T extends {}> {
  get(): TypeGuard<T>;
  with<V>(ptv: PartialTypeGuard<{}, V>): InterfaceBuilder<T & V>;
  withProperty<K extends string, V>(key: K, ptv: TypeGuard<V>): InterfaceBuilder<T & { [prop in K]: V }>;
  withStringIndexSignature<V>(value: TypeGuard<V>, enforce?: boolean): InterfaceBuilder<T & { [prop: string]: V }>;
  withNumericIndexSignature<V>(value: TypeGuard<V>, enforce?: boolean): InterfaceBuilder<T & { [i: number]: V }>;
}

/**
 * Internal class used to represent each step in the building process.
 */
class InterfaceStep<T extends {}> implements InterfaceBuilder<T> {
  private ptt: PartialTypeGuard<{}, T>;

  public constructor(ptt: PartialTypeGuard<{}, T>) {
    this.ptt = ptt;
  }

  public get(): TypeGuard<T> {
    return (obj): obj is T => isObjectLike(obj) && this.ptt(obj);
  }

  public with<V>(ptv: PartialTypeGuard<{}, V>): InterfaceBuilder<T & V> {
    return new InterfaceStep<T & V>(isIntersection(this.ptt, ptv));
  }

  public withProperty<K extends string, V>(key: K, ptv: TypeGuard<V>): InterfaceBuilder<T & Record<K, V>> {
    return new InterfaceStep(isIntersection(this.ptt, o.hasProperty(key, ptv)));
  }

  public withStringIndexSignature<V>(value: TypeGuard<V>, enforce: boolean = true)
      : InterfaceBuilder<T & { [prop: string]: V }> {
    return new InterfaceStep(isIntersection(this.ptt, o.hasStringIndexSignature(value, enforce)));
  }

  public withNumericIndexSignature<V>(value: TypeGuard<V>, enforce: boolean = true)
      : InterfaceBuilder<T & { [i: number]: V }> {
    return new InterfaceStep(isIntersection(this.ptt, o.hasNumericIndexSignature(value, enforce)));
  }
}

/**
 * A small class to help with constructing interface checkers.
 */
export class IsInterface implements InterfaceBuilder<{}> {
  public get(): TypeGuard<{}> {
    return isObjectLike;
  }

  public with<V>(ptv: PartialTypeGuard<{}, V>): InterfaceBuilder<{} & V> {
    return new InterfaceStep(ptv);
  }

  public withProperty<K extends string, V>(key: K, ptv: TypeGuard<V>): InterfaceBuilder<Record<K, V>> {
    return new InterfaceStep(o.hasProperty(key, ptv));
  }

  public withStringIndexSignature<V>(value: TypeGuard<V>, enforce: boolean = true)
    : InterfaceBuilder<{ [prop: string]: V }> {
    return new InterfaceStep(o.hasStringIndexSignature(value, enforce));
  }

  public withNumericIndexSignature<V>(value: TypeGuard<V>, enforce: boolean = true)
    : InterfaceBuilder<{ [i: number]: V }> {
    return new InterfaceStep(o.hasNumericIndexSignature(value, enforce));
  }
}
