import { PartialTypeGuard } from "./guards";

/**
 * Check if a value is a union of two types.
 */
export const isUnion =
  <T extends B, U extends B, B>(ptt: PartialTypeGuard<B, T>, ptu: PartialTypeGuard<B, U>): PartialTypeGuard<B, T | U> =>
  (o): o is T | U => ptt(o) || ptu(o);

/**
 * Check if a value is an intersection of two types.
 */
export const isIntersection =
  <T extends B, U extends B, B>(ptt: PartialTypeGuard<B, T>, ptu: PartialTypeGuard<B, U>): PartialTypeGuard<B, T & U> =>
  (o): o is T & U => ptt(o) && ptu(o);
