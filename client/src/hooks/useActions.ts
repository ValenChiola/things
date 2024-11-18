import { QueryFilters, QueryKey, useQueryClient } from "@tanstack/react-query"
import { ToastOptions, ToastType } from "react-hot-toast"

import { NoteDTO } from "../api/notes"
import { useUI } from "../contexts/UIContext"

export const useActions = () => {
    const { showToast } = useUI()
    const queryClient = useQueryClient()

    const actionDispatcher = ({ event, payload }: ActionsTypes) => {
        try {
            switch (event) {
                case "ui-reload": {
                    window.location.reload()
                    break
                }

                case "invalidate-query": {
                    queryClient.invalidateQueries(payload)

                    break
                }

                case "reset-query": {
                    queryClient.resetQueries(payload)

                    break
                }

                case "set-query-data": {
                    const { queryKey, data } = payload
                    const snapshot = queryClient.getQueryData(
                        queryKey
                    ) as typeof data

                    queryClient.setQueryData(queryKey, {
                        ...snapshot,
                        ...data,
                    })

                    break
                }

                case "show-toast": {
                    const { type, message, ...options } = payload
                    // @ts-expect-error
                    showToast[type](message, options)
                    break
                }

                case "go-to": {
                    window.location.href = payload.goTo
                    break
                }

                case "note-update": {
                    const { id, ...rest } = payload

                    queryClient.setQueryData<{ note: NoteDTO }>(
                        ["Note", id],
                        (old) =>
                            old
                                ? {
                                      ...old,
                                      note: {
                                          ...old.note,
                                          ...rest,
                                      },
                                  }
                                : old
                    )
                    break
                }

                default: {
                    const _exhaustiveCheck: never = event
                    console.warn("❗ Action not found:", {
                        event,
                        payload,
                    })
                    return
                }
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

type ActionsTypes =
    | {
          event: "ui-reload"
          payload?: undefined
      }
    | {
          event: "invalidate-query"
          payload: QueryFilters
      }
    | {
          event: "reset-query"
          payload: QueryFilters
      }
    | {
          event: "set-query-data"
          payload: {
              queryKey: QueryKey
              data: Record<string, unknown>
          }
      }
    | {
          event: "show-toast"
          payload: {
              type: ToastType
              message: string
          } & ToastOptions
      }
    | {
          event: "go-to"
          payload: {
              goTo: string
          }
      }
    | {
          event: "note-update"
          payload: NoteDTO
      }
