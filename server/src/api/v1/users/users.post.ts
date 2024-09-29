import { UserPostSchema } from "../../../domain/validations/v1/users.validations"
import { createController } from "../../../infrastructure/createController"
import { createUser } from "../../../domain/services/users/users.create.service"

export default createController(UserPostSchema, async ({ body }) => {
    const user = await createUser(body)

    return {
        user,
    }
})
