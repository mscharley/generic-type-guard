import { PartialTypeGuard } from "../guards";
import { isUnion } from "./functions";

/**
 * A small class to help with constructing larger union checkers.
 */
export class UnionOf<B, T extends B, U extends B> {
  private combination: PartialTypeGuard<B, T | U>;

  constructor(ptt: PartialTypeGuard<B, T>, ptu: PartialTypeGuard<B, U>) {
    this.combination = isUnion(ptt, ptu);
  }

  public get = () => this.combination;

  public with<V extends B>(ptv: PartialTypeGuard<B, V>) {
    return new UnionOf(this.combination, ptv);
  }
}
