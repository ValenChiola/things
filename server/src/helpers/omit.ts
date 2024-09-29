import { Prettify } from "../domain/interfaces/general"

export const omit = <T extends Record<PropertyKey, unknown>, K extends keyof T>(
    obj: T,
    keys: K[]
): Prettify<Omit<T, K>> => {
    const newObj: any = {}
    Object.keys(obj).forEach((key) => {
        if (!keys.includes(key as K)) {
            newObj[key] = obj[key]
        }
    })
    return newObj
}
