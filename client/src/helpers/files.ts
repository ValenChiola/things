export const exportAsFile = ({
    title,
    content,
    extension = "md",
}: {
    title: string
    content: string
    extension?: string
}) => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${title}.${extension}`
    a.click()
    URL.revokeObjectURL(url)
}
