import bcrypt from "bcrypt"

export const hash = (str: string, salt = 10) => bcrypt.hash(str, salt)
export const compare = bcrypt.compare
