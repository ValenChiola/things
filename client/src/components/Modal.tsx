import { ComponentProps, PropsWithChildren } from "react"

import { Cross } from "./icons/Cross"
import ReactModal from "react-modal"

ReactModal.setAppElement("#root")

export const Modal = ({
    state: [isOpen, setIsOpen],
    children,
    style,
    ...rest
}: Props) => (
    <ReactModal
        isOpen={isOpen}
        {...rest}
        style={{
            content: {
                width: "max-content",
                height: "max-content",
                margin: "auto",
                color: "black",
                background: "white",
                ...style?.content,
                borderRadius: "var(--border-radius)",
            },
            overlay: {
                ...style?.overlay,
            },
        }}
    >
        <Cross
            onClick={() => setIsOpen(false)}
            style={{
                cursor: "pointer",
                position: "absolute",
                right: 10,
                top: 10,
            }}
        />
        {children}
    </ReactModal>
)

type Props = Omit<
    PropsWithChildren<ComponentProps<typeof ReactModal>>,
    "isOpen"
> & {
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}
