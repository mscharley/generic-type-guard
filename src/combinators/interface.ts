import { PartialTypeGuard, TypeGuard } from "../guards";
import { hasProperty } from "../objects";
import { isObject } from "../primitives";
import { isIntersection } from "./functions";

// tslint:disable:max-classes-per-file

export interface InterfaceBuilder<T extends {}> {
  get(): TypeGuard<T>;
  withProperty<K extends string, V>(key: K, ptv: TypeGuard<V>): InterfaceBuilder<T & { [prop in K]: V }>;
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
    return (o): o is T => isObject(o) && this.ptt(o);
  }

  public withProperty<K extends string, V>(key: K, ptv: TypeGuard<V>): InterfaceBuilder<T & { [prop in K]: V }> {
    return new InterfaceStep(isIntersection(this.ptt, hasProperty(key, ptv)));
  }
}

/**
 * A small class to help with constructing interface checkers.
 */
export class IsInterface implements InterfaceBuilder<{}> {
  public get(): TypeGuard<{}> {
    return isObject;
  }

  public withProperty<K extends string, V>(key: K, ptv: TypeGuard<V>): InterfaceBuilder<{ [prop in K]: V }> {
    return new InterfaceStep(hasProperty(key, ptv));
  }
}
