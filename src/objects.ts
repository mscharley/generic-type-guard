import { PartialTypeGuard, TypeGuard } from "./guards";

/**
 * Validates that a given object has a property of a given type.
 */
export const hasProperty =
  <K extends string, V>(property: K, value: TypeGuard<V>): PartialTypeGuard<{}, { [prop in K]: V }> =>
  (o): o is { [prop in K]: V } => o.hasOwnProperty(property) && value((o as { [prop: string]: any })[property]);

/**
 * Validates that a given object is an instance of a class.
 */
export const isInstance = <T extends {}>(klass: { new(...args: any[]): T }): TypeGuard<T> =>
  (o): o is T => o instanceof klass;
