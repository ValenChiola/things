import { ComponentProps } from "react"

export const MicIcon = (props: ComponentProps<"svg">) => (
    <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        height="1em"
        width="1em"
        {...props}
    >
        <path d="M3.5 6.5A.5.5 0 014 7v1a4 4 0 008 0V7a.5.5 0 011 0v1a5 5 0 01-4.5 4.975V15h3a.5.5 0 010 1h-7a.5.5 0 010-1h3v-2.025A5 5 0 013 8V7a.5.5 0 01.5-.5z" />
        <path d="M10 8a2 2 0 11-4 0V3a2 2 0 114 0v5zM8 0a3 3 0 00-3 3v5a3 3 0 006 0V3a3 3 0 00-3-3z" />
    </svg>
)
