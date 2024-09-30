import { authenticateError } from "../../../api/v1/auth/auth.refresh.get"
import { findOneUser } from "../users/user.find.one.service"
import { sendError } from "../../error"
import { signPayload } from "./auth.sign.payload.service"

export const getUserToken = async (sub: string) => {
    const user = await findOneUser({
        where: { id: sub },
        select: { role: true },
    })
    if (!user)
        return sendError(authenticateError.message, authenticateError.code)

    const { role } = user
    return signPayload({ sub, role })
}
