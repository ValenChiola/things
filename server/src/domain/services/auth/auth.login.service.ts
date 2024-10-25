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
    const me = await findOneUser({ where: { email } })
    if (!me) return sendError("Invalid credentials", 401)

    const isValidPassword = await compare(password, me.password)
    if (!isValidPassword) return sendError("Invalid credentials", 401)

    const { id: sub, role } = me
    const token = signPayload({ sub, role }, { sub })

    return {
        me,
        token,
    }
}
