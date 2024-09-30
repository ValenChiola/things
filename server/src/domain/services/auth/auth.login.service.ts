import { compare } from "../../../helpers/bcrypt"
import { findOneUser } from "../users/user.find.one.service"
import { sendError } from "../../error"
import { signPayload } from "./auth.sign.payload.service"

export const userLogin = async ({
    email,
    password,
}: {
    email: string
    password: string
}) => {
    const user = await findOneUser({ where: { email } })

    if (!user) return sendError("Invalid credentials", 401)

    const isValidPassword = await compare(password, user.password)
    if (!isValidPassword) return sendError("Invalid credentials", 401)

    const { id: sub, role } = user
    const token = signPayload({ sub, role })
    return {
        token,
        sub,
    }
}
