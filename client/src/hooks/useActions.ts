export const useActions = () => {
    const actionDispatcher = ({ event, payload }: ActionsTypes) => {
        try {
            switch (event) {
                case "ui-reload": {
                    window.location.reload()
                    break
                }

                default:
                    console.warn("❗ Action not found:", {
                        event,
                        payload,
                    })
                    return
            }
        } catch (error) {
            console.error("❗ Error in actionDispatcher:", {
                event,
                payload,
                error,
            })
        }
    }

    return { actionDispatcher }
}

type ActionsTypes = {
    event: "ui-reload"
    payload?: undefined
}
