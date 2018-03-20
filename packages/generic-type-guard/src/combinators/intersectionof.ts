import { PartialTypeGuard } from "../guards";
import { isIntersection } from "./functions";

/**
 * A small class to help with constructing larger intersection checkers.
 */
export class IntersectionOf<B, T extends B> {
  private ptt: PartialTypeGuard<B, T>;

  constructor(ptt: PartialTypeGuard<B, T>) {
    this.ptt = ptt;
  }

  public get() {
    return this.ptt;
  }

  public with<U extends B>(ptu: PartialTypeGuard<B, U>) {
    return new IntersectionOf(isIntersection(this.ptt, ptu));
  }
}
