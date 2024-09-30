import { DB } from "../../../infrastructure/database/db"
import { hash } from "../../../helpers/bcrypt"
import { omit } from "../../../helpers/omit"

export const createUser = async ({
    password,
    ...rest
}: Omit<Parameters<typeof DB.user.create>[0]["data"], "role">) =>
    DB.user
        .create({
            data: {
                ...rest,
                role: "user",
                password: await hash(password),
            },
        })
        .then((user) => omit(user, ["password"]))
