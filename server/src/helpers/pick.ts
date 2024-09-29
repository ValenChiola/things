import { Prettify } from "../domain/interfaces/general"

export const pick = <T, K extends keyof T>(
    obj: T,
    keys: K[]
): Prettify<Pick<T, K>> => {
    const newObj: any = {}
    keys.forEach((key) => {
        newObj[key] = obj[key]
    })
    return newObj
}
