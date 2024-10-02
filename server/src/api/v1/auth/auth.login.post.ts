import { LoginSchema } from "../../../domain/validations/v1/auth.validations"
import { createController } from "../../../infrastructure/createController"
import { setRefreshTokenCookie } from "../../../domain/services/auth/auth.set.refresh.cookie.service"
import { userLogin } from "../../../domain/services/auth/auth.login.service"

export default createController(LoginSchema, async ({ body }, reply) => {
    const { me, ...rest } = await userLogin(body)

    await setRefreshTokenCookie(me.id, reply)

    return {
        me,
        ...rest,
    }
})
