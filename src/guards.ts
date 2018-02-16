
export type NotEmpty = {} | number | string | boolean | symbol;
export type AlmostAny = NotEmpty | null | undefined;

export type PartialTypeGuard<T, U extends T> = (value: T) => value is U;
export type TypeGuard<T> = PartialTypeGuard<AlmostAny, T>;
