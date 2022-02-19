## API Report File for "generic-type-guard"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export const assert: <T, Guard extends PartialTypeGuard<T, T>>(value: T, guard: Guard, message?: string) => asserts value is GuardedType<Guard>;

// @public
export class AssertionError extends RangeError {
    constructor(value: unknown, message?: string);
    // (undocumented)
    value: unknown;
}

// @public
export const combine: {
    <A, B extends A, C extends B>(g1: PartialTypeGuard<A, B>, g2: PartialTypeGuard<B, C>): PartialTypeGuard<A, C>;
    <A, B extends A, C extends B, D extends C>(g1: PartialTypeGuard<A, B>, g2: PartialTypeGuard<B, C>, g3: PartialTypeGuard<C, D>): PartialTypeGuard<A, D>;
    <A, B extends A, C extends B, D extends C, E extends D>(g1: PartialTypeGuard<A, B>, g2: PartialTypeGuard<B, C>, g3: PartialTypeGuard<C, D>, g4: PartialTypeGuard<D, E>): PartialTypeGuard<A, E>;
    <A, B extends A, C extends B, D extends C, E extends D, F extends E>(g1: PartialTypeGuard<A, B>, g2: PartialTypeGuard<B, C>, g3: PartialTypeGuard<C, D>, g4: PartialTypeGuard<D, E>, g5: PartialTypeGuard<D, E>): PartialTypeGuard<A, F>;
};

// @public
export type Diff<T, U> = T extends U ? never : T;

// @public
export type GuardedType<T extends PartialTypeGuard<any, unknown>> = T extends PartialTypeGuard<any, infer U> ? U : never;

// @public
export const hasNumericIndexSignature: <V>(value: TypeGuard<V>, enforce?: boolean) => PartialTypeGuard<object, Record<number, V>>;

// @public
export const hasOnlyProperties: <V extends object>(props: MappedTypeGuard<V>) => PartialTypeGuard<object, V>;

// @public
export const hasOptionalProperties: <V extends object>(props: MappedTypeGuard<V>) => PartialTypeGuard<object, Partial<V>>;

// @public
export const hasOptionalProperty: <K extends string, V>(property: K, value: TypeGuard<V>) => PartialTypeGuard<object, { [prop in K]?: V | undefined; }>;

// @public
export const hasProperties: <V extends object>(props: MappedTypeGuard<V>) => PartialTypeGuard<object, V>;

// @public
export const hasProperty: <K extends string, V>(property: K, value: TypeGuard<V>) => PartialTypeGuard<object, Record<K, V>>;

// @public
export const hasStringIndexSignature: <V>(value: TypeGuard<V>, enforce?: boolean) => PartialTypeGuard<object, Record<string, V>>;

// @public
export interface InterfaceBuilder<T extends object> {
    get: () => TypeGuard<T>;
    with: <V extends object>(ptv: PartialTypeGuard<object, V>) => InterfaceBuilder<T & V>;
    withNumericIndexSignature: <V>(value: TypeGuard<V>, enforce?: boolean) => InterfaceBuilder<T & Record<number, V>>;
    withOptionalProperties: <V extends object>(props: MappedTypeGuard<V>) => InterfaceBuilder<T & Partial<V>>;
    withOptionalProperty: <K extends string, V>(key: K, ptv: TypeGuard<V>) => InterfaceBuilder<T & {
        [prop in K]?: V;
    }>;
    withProperties: <V extends object>(props: MappedTypeGuard<V>) => InterfaceBuilder<T & V>;
    withProperty: <K extends string, V>(key: K, ptv: TypeGuard<V>) => InterfaceBuilder<T & {
        [prop in K]: V;
    }>;
    withStringIndexSignature: <V>(value: TypeGuard<V>, enforce?: boolean) => InterfaceBuilder<T & Record<string, V>>;
}

// @public
export class IntersectionOf<B, T extends B> {
    constructor(ptt: PartialTypeGuard<B, T>);
    get(): PartialTypeGuard<B, T>;
    with<U extends B>(ptu: PartialTypeGuard<B, U>): IntersectionOf<B, T & U>;
}

// @public
export const isAny: TypeGuard<unknown>;

// @public
export const isArray: <T>(valueCheck: TypeGuard<T>) => TypeGuard<T[]>;

// @public
export const isBoolean: TypeGuard<boolean>;

// @public
export const isDouble: TypeGuard<number>;

// @public
export const isElementOf: {
    (): TypeGuard<never>;
    <T>(...ss: T[]): TypeGuard<T>;
};

// @public
export const isExactObject: <V extends object>(props: MappedTypeGuard<V>) => TypeGuard<V>;

// @public
export const isFiniteNumber: TypeGuard<number>;

// @public
export const isFloat: TypeGuard<number>;

// @public
export const isInfinity: TypeGuard<number>;

// @public
export const isInstance: <T extends object>(klass: new (...args: unknown[]) => T) => TypeGuard<T>;

// @public
export class IsInterface implements InterfaceBuilder<object> {
    // (undocumented)
    get(): TypeGuard<object>;
    // (undocumented)
    with<V extends object>(ptv: PartialTypeGuard<object, V>): InterfaceBuilder<V>;
    // (undocumented)
    withNumericIndexSignature<V>(value: TypeGuard<V>, enforce?: boolean): InterfaceBuilder<Record<number, V>>;
    // (undocumented)
    withOptionalProperties<V extends object>(props: MappedTypeGuard<V>): InterfaceBuilder<object & Partial<V>>;
    // (undocumented)
    withOptionalProperty<K extends string, V>(key: K, ptv: TypeGuard<V>): InterfaceBuilder<object & {
        [prop in K]?: V;
    }>;
    // (undocumented)
    withProperties<V extends object>(props: MappedTypeGuard<V>): InterfaceBuilder<object & V>;
    // (undocumented)
    withProperty<K extends string, V>(key: K, ptv: TypeGuard<V>): InterfaceBuilder<Record<K, V>>;
    // (undocumented)
    withStringIndexSignature<V>(value: TypeGuard<V>, enforce?: boolean): InterfaceBuilder<Record<string, V>>;
}

// @public
export const isIntersection: <B, T extends B, U extends B>(ptt: PartialTypeGuard<B, T>, ptu: PartialTypeGuard<B, U>) => PartialTypeGuard<B, T & U>;

// @public
export const isMissing: <T>(tgt: TypeGuard<T>) => TypeGuard<T | null | undefined>;

// @public
const isNaN_2: TypeGuard<number>;
export { isNaN_2 as isNaN }

// @public
export const isNever: (n: never) => never;

// @public
export const isNull: TypeGuard<null>;

// @public
export const isNullable: <T>(tgt: TypeGuard<T>) => TypeGuard<T | null>;

// @public
export const isNumber: TypeGuard<number>;

// @public
export const isObject: TypeGuard<object>;

// @public
export const isObjectLike: TypeGuard<object>;

// @public
export const isOptional: <T>(tgt: TypeGuard<T>) => TypeGuard<T | undefined>;

// @public
export const isRecord: <K extends string, V>(property: K, value: TypeGuard<V>) => TypeGuard<Record<K, V>>;

// @public
export const isSet: <T = unknown>(obj: T) => obj is Diff<T, null | undefined>;

// @public
export const isSetOf: <T>(tg: TypeGuard<T>) => (o: unknown) => o is Set<T>;

// @public
export const isSingletonNumber: <T extends number>(v: T) => TypeGuard<T>;

// @public
export const isSingletonNumberUnion: {
    (): TypeGuard<never>;
    <T extends number>(...ss: T[]): TypeGuard<T>;
};

// @public
export const isSingletonString: <T extends string>(v: T) => TypeGuard<T>;

// @public
export const isSingletonStringUnion: {
    (): TypeGuard<never>;
    <T extends string>(...ss: T[]): TypeGuard<T>;
};

// @public
export const isString: TypeGuard<string>;

// @public
export const isUndefined: TypeGuard<undefined>;

// @public
export const isUnion: <B, T extends B, U extends B>(ptt: PartialTypeGuard<B, T>, ptu: PartialTypeGuard<B, U>) => PartialTypeGuard<B, T | U>;

// @public
export const isUnknown: TypeGuard<unknown>;

// @public
export type MappedTypeGuard<T> = {
    [P in keyof T]: TypeGuard<T[P]>;
};

// @public
export const narrowArray: <T, U extends T>(pt: PartialTypeGuard<T, U>) => PartialTypeGuard<T[], U[]>;

// @public
export const narrowValue: <T, U extends T, V extends U>(ptt: PartialTypeGuard<T, U>, ptu: PartialTypeGuard<U, V>) => PartialTypeGuard<T, V>;

// @public
export type PartialTypeGuard<T, U extends T> = (value: T) => value is U;

// @public
export type TypeGuard<T> = PartialTypeGuard<unknown, T>;

// @public
export class UnionOf<B, T extends B> {
    constructor(ptt: PartialTypeGuard<B, T>);
    get(): PartialTypeGuard<B, T>;
    with<U extends B>(ptv: PartialTypeGuard<B, U>): UnionOf<B, T | U>;
}

// (No @packageDocumentation comment for this package)

```