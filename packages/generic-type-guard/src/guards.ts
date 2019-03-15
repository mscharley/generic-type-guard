type Diff<T, U> = T extends U ? never : T;
export type NotEmpty = Diff<unknown, null | undefined>;

export type PartialTypeGuard<T, U extends T> = (value: T) => value is U;
export type TypeGuard<T> = PartialTypeGuard<unknown, T>;

export type MappedTypeGuard<T> = {
    [P in keyof T]: TypeGuard<T[P]>;
};
