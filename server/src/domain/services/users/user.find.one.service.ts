import { DB } from "../../../infrastructure/database/db"

export const findOneUser = DB.user.findFirst
