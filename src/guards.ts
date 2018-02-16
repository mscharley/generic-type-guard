
// tslint:disable-next-line:ban-types
export type NotEmpty = {} | object | number | string | boolean | symbol | Function;
export type AlmostAny = NotEmpty | null | undefined;

export type PartialTypeGuard<T, U extends T> = (value: T) => value is U;
export type TypeGuard<T> = PartialTypeGuard<AlmostAny, T>;
