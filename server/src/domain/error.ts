export class ErrorWithCode extends Error {
    code: number

    constructor(message: unknown, code = 500) {
        super(`${message}`)
        this.code = code
    }
}

export const sendError = (
    ...args: ConstructorParameters<typeof ErrorWithCode>
) => {
    throw new ErrorWithCode(...args)
}
