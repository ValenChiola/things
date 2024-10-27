import { DownloadIcon } from "../icons/DownloadIcon"
import { exportAsFile } from "../../helpers/files"
import { useNote } from "../../hooks/useNote"

export const Download = ({ id }: { id?: string }) => {
    const { note } = useNote(id)
    if (!note) return null

    return <DownloadIcon onClick={() => exportAsFile(note)} />
}
