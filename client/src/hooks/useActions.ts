import { QueryFilters, QueryKey, useQueryClient } from "@tanstack/react-query"

import { NoteDTO } from "../api/notes"

export const useActions = () => {
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
          event: "set-query-data"
          payload: {
              queryKey: QueryKey
              data: Record<string, unknown>
          }
      }
    | {
          event: "note-update"
          payload: NoteDTO
      }
