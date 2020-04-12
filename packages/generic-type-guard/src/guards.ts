/**
 * A partial type guard that can take a value of one type and determine if it is also a valid value of a subtype.
 */
export type PartialTypeGuard<T, U extends T> = (value: T) => value is U;
/**
 * A full type guard that can guard any value and determine if it is valid.
 */
export type TypeGuard<T> = PartialTypeGuard<unknown, T>;
/**
 * Extracts the type that is being guarded for from a type guard.
 */
export type GuardedType<T extends PartialTypeGuard<any, unknown>> =
  T extends PartialTypeGuard<any, infer U> ? U : never;

/**
 * An object of type guards based on the input type.
 */
export type MappedTypeGuard<T> = {
  [P in keyof T]: TypeGuard<T[P]>;
};
