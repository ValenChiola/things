import { ComponentProps } from "react"

export const MicDisabledIcon = (props: ComponentProps<"svg">) => (
    <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        height="1em"
        width="1em"
        {...props}
    >
        <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0012 8V7a.5.5 0 011 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 01-2.43.923V15h3a.5.5 0 010 1h-7a.5.5 0 010-1h3v-2.025A5 5 0 013 8V7a.5.5 0 011 0v1a4 4 0 004 4zm3-9v4.879l-1-1V3a2 2 0 00-3.997-.118l-.845-.845A3.001 3.001 0 0111 3z" />
        <path d="M9.486 10.607l-.748-.748A2 2 0 016 8v-.878l-1-1V8a3 3 0 004.486 2.607zm-7.84-9.253l12 12 .708-.708-12-12-.708.708z" />
    </svg>
)
