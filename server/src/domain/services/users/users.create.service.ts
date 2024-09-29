import { DB } from "../../../infrastructure/database/db"
import { hash } from "../../../helpers/bcrypt"
import { omit } from "../../../helpers/omit"

export const createUser = async ({
    password,
    ...rest
}: Parameters<typeof DB.user.create>[0]["data"]) =>
    DB.user
        .create({
            data: {
                ...rest,
                password: await hash(password),
            },
        })
        .then((user) => omit(user, ["password"]))
