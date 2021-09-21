import type { MappedTypeGuard, PartialTypeGuard, TypeGuard } from './guards';
import { combine } from './utils';
import { isObject } from './primitives';

/**
 * Validates that a given object has a property of a given type.
 *
 * @public
 */
export const hasProperty =
  <K extends string, V>(
    property: K,
    value: TypeGuard<V>,
  ): PartialTypeGuard<object, Record<K, V>> =>
  (o: object): o is { [prop in K]: V } =>
    // If the property exists and conforms to the value type guard.
    value((o as Record<string, unknown>)[property]);

/**
 * Validates that a given object has an optional property of a given type.
 *
 * @public
 */
export const hasOptionalProperty =
  <K extends string, V>(
    property: K,
    value: TypeGuard<V>,
  ): PartialTypeGuard<object, { [prop in K]?: V }> =>
  (o: object): o is { [prop in K]: V } =>
    !(property in o) ||
    // If the property exists and conforms to the value type guard.
    value((o as Record<string, unknown>)[property]);

/**
 * Validate that a variable is an object with a single field.
 *
 * If you need multiple fields then use hasProperties.
 *
 * @public
 */
export const isRecord =
  <K extends string, V>(
    property: K,
    value: TypeGuard<V>,
  ): TypeGuard<Record<K, V>> =>
  (o: unknown): o is { [prop in K]: V } =>
    isObject(o) && hasProperty(property, value)(o);

/**
 * Validates that a given object has a string index signature.
 *
 * @param enforce - Whether to enforce that there is at least one property already set. Be careful setting this to
 *   false, you will get some unexpected outputs, for instance arrays will have a string index signature.
 *
 * @public
 */
export const hasStringIndexSignature =
  <V>(
    value: TypeGuard<V>,
    enforce = true,
  ): PartialTypeGuard<object, Record<string, V>> =>
  (o: object): o is Record<string, V> => {
    let n = 0;
    for (const prop in o) {
      if (isNaN(parseInt(prop, 10))) {
        if (value((o as Record<string, unknown>)[prop])) {
          n++;
        } else {
          return false;
        }
      }
    }

    return !enforce || n > 0;
  };

/**
 * Validates that a given object has a numeric index signature.
 *
 * @param enforce - Whether to enforce that there is at least one property already set. Be careful setting this to
 *   false, you will get some unexpected outputs, for instance objects will have a numeric index signature.
 *
 * @public
 */
export const hasNumericIndexSignature =
  <V>(
    value: TypeGuard<V>,
    enforce = true,
  ): PartialTypeGuard<object, Record<number, V>> =>
  (o: object): o is Record<string, V> => {
    let n = 0;
    for (const prop in o) {
      if (!isNaN(parseInt(prop, 10))) {
        // We still index as a string here because prop is a string.
        if (value((o as Record<string, unknown>)[prop])) {
          n++;
        } else {
          return false;
        }
      }
    }

    return !enforce || n > 0;
  };

/**
 * Validates that a given object is an instance of a class.
 *
 * @public
 */
export const isInstance =
  <T extends object>(klass: new (...args: unknown[]) => T): TypeGuard<T> =>
  (o: unknown): o is T =>
    o instanceof klass;

/**
 * Validate that a given object has all the given properties
 *
 * @param props - a MappedGuard of the object to be validated, i.e. an object that has the same properties as the
 *    object being validated whose types are TypeGuards for the matching type on the original property.
 *
 * @public
 */
export const hasProperties =
  <V extends object>(props: MappedTypeGuard<V>): PartialTypeGuard<object, V> =>
  (o: object): o is V => {
    for (const prop in props) {
      if (!hasProperty(prop, props[prop])(o)) {
        return false;
      }
    }

    return true;
  };

/**
 * Validate that a given object only has the given properties
 *
 * @param props - A MappedTypeGuard of the object to be validated.
 *
 * @public
 */
export const hasOnlyProperties =
  <V extends object>(props: MappedTypeGuard<V>): PartialTypeGuard<object, V> =>
  (o: object): o is V => {
    const found: Array<keyof typeof props> = [];

    for (const prop in o) {
      if (prop in props) {
        const propsKey = prop as Extract<keyof typeof props, string>;
        if (!hasProperty(propsKey, props[propsKey])(o)) {
          return false;
        }
        found.push(propsKey);
      } else {
        return false;
      }
    }

    return found.length === Object.keys(props).length;
  };

/**
 * Validate that a given object has all the given optional properties
 *
 * @param props - a MappedGuard of the object to be validated, i.e. an object that has the same properties as the
 *    object being validated whose types are TypeGuards for the matching type on the original property.
 *
 * @public
 */
export const hasOptionalProperties =
  <V extends object>(
    props: MappedTypeGuard<V>,
  ): PartialTypeGuard<object, Partial<V>> =>
  (o: object): o is Partial<V> => {
    for (const prop in props) {
      if (!hasOptionalProperty(prop, props[prop])(o)) {
        return false;
      }
    }

    return true;
  };

/**
 * Validate that an object has exactly the fields provided
 *
 * @public
 */
export const isExactObject = <V extends object>(
  props: MappedTypeGuard<V>,
): TypeGuard<V> => combine(isObject, hasProperties(props));
