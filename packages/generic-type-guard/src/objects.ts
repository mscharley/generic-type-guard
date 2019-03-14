import { MappedGuard, PartialTypeGuard, TypeGuard } from "./guards";
import { isObject } from "./primitives";

/**
 * Validates that a given object has a property of a given type.
 */
export const hasProperty =
  <K extends string, V>(property: K, value: TypeGuard<V>): PartialTypeGuard<{}, Record<K, V>> =>
    (o): o is { [prop in K]: V } =>
      // If the property exists and conforms to the value type guard.
      value((o as { [prop: string]: unknown })[property]);

/**
 * Validate that a variable is an object with a single field.
 *
 * If you need multiple fields then use IsInterface.
 */
export const isRecord =
  <K extends string, V>(property: K, value: TypeGuard<V>): TypeGuard<Record<K, V>> =>
    (o): o is { [prop in K]: V } => isObject(o) && hasProperty(property, value)(o);

/**
 * Validates that a given object has a string index signature.
 *
 * @param {boolean} enforce
 *   Whether to enforce that there is at least one property already set. Be careful setting this to false, you will
 *   get some unexpected outputs, for instance arrays will have a string index signature.
 */
export const hasStringIndexSignature =
  <V>(value: TypeGuard<V>, enforce = true): PartialTypeGuard<{}, { [prop: string]: V }> =>
    (o): o is { [prop: string]: V } => {
      let n = 0;
      for (const prop in o) {
        if (isNaN(parseInt(prop, 10))) {
          if (value((o as { [prop: string]: unknown })[prop])) {
            n += 1;
          }
          else {
            return false;
          }
        }
      }

      return !enforce || n > 0;
    };

/**
 * Validates that a given object has a numeric index signature.
 *
 * @param {boolean} enforce
 *   Whether to enforce that there is at least one property already set. Be careful setting this to false, you will
 *   get some unexpected outputs, for instance objects will have a numeric index signature.
 */
export const hasNumericIndexSignature =
  <V>(value: TypeGuard<V>, enforce = true): PartialTypeGuard<{}, { [prop: number]: V }> =>
    (o): o is { [prop: string]: V } => {
      let n = 0;
      for (const prop in o) {
        if (!isNaN(parseInt(prop, 10))) {
          // We still index as a string here because prop is a string.
          if (value((o as { [prop: string]: unknown })[prop])) {
            n += 1;
          }
          else {
            return false;
          }
        }
      }

      return !enforce || n > 0;
    };

/**
 * Validates that a given object is an instance of a class.
 */
export const isInstance = <T extends {}>(klass: new (...args: any[]) => T): TypeGuard<T> =>
  (o): o is T => o instanceof klass;

/**
 * Validate that a given object has all the given properties
 * @param props a MappedGuard of the object to be validated, i.e. an object that has the same properties as the
 *    object being validated whose types are TypeGuards for the matching type on the original property.
 */
export const hasProperties =
  <V>(props: MappedGuard<V>): PartialTypeGuard<{}, V> =>
    (o): o is V =>
      (Object.entries(props) as Array<[string, TypeGuard<any>]>)
        .every((entry) => hasProperty(entry[0], entry[1])(o));
