import { isSingletonString } from "primitives";
import { GuardedType, PartialTypeGuard } from "./guards";

/**
 * Indicates there was an error validating a typeguard.
 *
 * @public
 */
export class AssertionError extends RangeError {
  public constructor(message?: string) {
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
export const assert: <T, Guard extends PartialTypeGuard<T, T>>(value: T, guard: Guard, message?: string) => asserts value is GuardedType<Guard> =
  (value, guard, message) => {
    if (!guard(value)) {
      throw new AssertionError(message ?? `Invalid value provided: ${value}`);
    }
  };
