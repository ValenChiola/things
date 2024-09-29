export const generateRandomString = (length = 10) =>
    Math.random().toString(36).substr(2, length)
