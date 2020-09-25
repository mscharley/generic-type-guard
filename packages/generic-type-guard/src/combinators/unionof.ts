import { isUnion } from "./functions";
import { PartialTypeGuard } from "../guards";

/**
 * A small class to help with constructing larger union checkers.
 *
 * @public
 */
export class UnionOf<B, T extends B> {
  private ptt: PartialTypeGuard<B, T>;

  constructor(ptt: PartialTypeGuard<B, T>) {
    this.ptt = ptt;
  }

  /**
   * Finalise and return the partial type guard for this builder.
   */
  public get(): PartialTypeGuard<B, T> {
    return this.ptt;
  }

  /**
   * Add a new option for this union.
   */
  public with<U extends B>(ptv: PartialTypeGuard<B, U>): UnionOf<B, T | U> {
    return new UnionOf(isUnion(this.ptt, ptv));
  }
}
