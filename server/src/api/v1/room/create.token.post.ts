import { CreateRoomTokenPostSchema } from "../../../domain/validations/v1/room.validations"
import { createController } from "../../../infrastructure/createController"
import { findOneUser } from "../../../domain/services/users/user.find.one.service"
import { sendError } from "../../../domain/error"

const { LIVEKIT_API_KEY, LIVEKIT_API_SECRET } = process.env
const serverUrl = "wss://things-8i2lofey.livekit.cloud"

export default createController(
    CreateRoomTokenPostSchema,
    async ({
        body: { room },
        jwt: {
            payload: { sub },
        },
    }) => {
        const user = await findOneUser({ where: { id: sub } })
        if (!user) return sendError("User not found", 404)

        const { AccessToken } = await import("livekit-server-sdk")

        const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
            identity: user.id,
            name: user.displayName,
            ttl: "3h", // Token valid for 3 hours
        })

        at.addGrant({ roomJoin: true, room })

        const roomToken = await at.toJwt()

        return {
            roomToken,
        }
    }
)
