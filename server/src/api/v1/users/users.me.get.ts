import { createController } from "../../../infrastructure/createController"
import { findOneUser } from "../../../domain/services/users/user.find.one.service"
import { omit } from "../../../helpers/omit"

export default createController(
    null,
    async ({
        jwt: {
            payload: { sub: id },
        },
    }) => {
        const me = await findOneUser({ where: { id } })

        return {
            me: me ? omit(me, ["password"]) : null,
        }
    }
)
