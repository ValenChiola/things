// Type Helpers
export type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}

export type PartialByKeys<
    T extends Record<string, unknown>,
    K extends keyof T
> = Prettify<Partial<T> & Omit<T, K>>
