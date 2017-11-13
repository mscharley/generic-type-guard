import { PartialTypeGuard } from "../guards";
import { isUnion } from "./functions";

/**
 * A small class to help with constructing larger union checkers.
 */
export class UnionOf<B, T extends B> {
  private ptt: PartialTypeGuard<B, T>;

  constructor(ptt: PartialTypeGuard<B, T>) {
    this.ptt = ptt;
  }

  public get() {
    return this.ptt;
  }

  public with<V extends B>(ptv: PartialTypeGuard<B, V>) {
    return new UnionOf(isUnion(this.ptt, ptv));
  }
}
