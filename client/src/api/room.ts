import { Api, ApiData } from "./api"

export const getRoomToken = (room: string) =>
    Api.post<ApiData<{ roomToken: string }>>("/v1/room/token", { room }).then(
        ({
            data: {
                data: { roomToken },
            },
        }) => roomToken
    )
