import type { GuardedType, PartialTypeGuard as PTG } from './guards';

/**
 * Indicates there was an error validating a typeguard.
 *
 * @public
 */
export class AssertionError extends RangeError {
  public constructor(public value: unknown, message?: string) {
    super(message);

    this.name = this.constructor.name;
  }
}

/**
 * Asserts that a guard is successful.
 *
 * This may not work properly in ECMAScript environments that don't fully support ES6. If this is your environment then
 * you should do this check manually and throw your own error.
 *
 * @throws AssertionError if the guard returns false.
 * @public
 */
export const assert: <T, Guard extends PTG<T, T>>(
  value: T,
  guard: Guard,
  message?: string,
) => asserts value is GuardedType<Guard> = (value, guard, message) => {
  if (!guard(value)) {
    throw new AssertionError(
      value,
      message ?? `Invalid value provided: ${JSON.stringify(value)}`,
    );
  }
};

/**
 * Helper to string many different typeguards together into something larger.
 *
 * @param guards - A list of partial typeguards to string together.
 *
 * @public
 */
export const combine: {
  <A, B extends A, C extends B>(g1: PTG<A, B>, g2: PTG<B, C>): PTG<A, C>;
  <A, B extends A, C extends B, D extends C>(
    g1: PTG<A, B>,
    g2: PTG<B, C>,
    g3: PTG<C, D>,
  ): PTG<A, D>;
  <A, B extends A, C extends B, D extends C, E extends D>(
    g1: PTG<A, B>,
    g2: PTG<B, C>,
    g3: PTG<C, D>,
    g4: PTG<D, E>,
  ): PTG<A, E>;
  <A, B extends A, C extends B, D extends C, E extends D, F extends E>(
    g1: PTG<A, B>,
    g2: PTG<B, C>,
    g3: PTG<C, D>,
    g4: PTG<D, E>,
    g5: PTG<D, E>,
  ): PTG<A, F>;
} =
  (...guards: Array<PTG<unknown, unknown>>) =>
  (v: unknown): v is unknown => {
    for (const guard of guards) {
      if (!guard(v)) {
        return false;
      }
    }

    return true;
  };
