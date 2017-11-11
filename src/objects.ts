import { PartialTypeGuard, TypeGuard } from "./guards";

/**
 * Validates that a given object has a property of a given type.
 */
export const hasProperty =
  <K extends string, V>(property: K, value: TypeGuard<V>): PartialTypeGuard<{}, { [prop in K]: V }> =>
  (o): o is { [prop in K]: V } => o.hasOwnProperty(property) && value((o as { [prop: string]: any })[property]);
