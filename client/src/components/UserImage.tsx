import { ComponentProps } from "react"
import Styles from "./UserImage.module.css"

export const UserImage = ({
    urlImage,
    displayName,
    className,
    ...rest
}: {
    urlImage: string
    displayName?: string
} & ComponentProps<"img">) => (
    <img
        className={`${Styles.image} ${className ?? ""}`}
        {...rest}
        src={urlImage}
        alt={displayName}
        title={displayName}
    />
)
