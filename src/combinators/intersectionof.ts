import { PartialTypeGuard } from "../guards";
import { isIntersection } from "./functions";

/**
 * A small class to help with constructing larger intersection checkers.
 */
export class IntersectionOf<B, T extends B, U extends B> {
  private combination: PartialTypeGuard<B, T & U>;

  constructor(ptt: PartialTypeGuard<B, T>, ptu: PartialTypeGuard<B, U>) {
    this.combination = isIntersection(ptt, ptu);
  }

  public get = () => this.combination;

  public with<V extends B>(ptv: PartialTypeGuard<B, V>) {
    return new IntersectionOf(this.combination, ptv);
  }
}
