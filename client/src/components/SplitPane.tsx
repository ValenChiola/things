import ReactSplitPane, { SplitPaneProps } from "react-split-pane"

import Styles from "./SplitPane.module.css"

export const SplitPane = ({ children, resizerStyle, ...rest }: SplitProps) => (
    /* @ts-ignore */
    <ReactSplitPane
        className={Styles.splitPane}
        split="vertical"
        minSize={100}
        maxSize={-100}
        defaultSize="50%"
        resizerStyle={{
            ...(rest.split === "vertical"
                ? {
                      cursor: "col-resize",
                      width: "var(--padding)",
                  }
                : {
                      cursor: "row-resize",
                      height: "var(--padding)",
                  }),
            ...resizerStyle,
        }}
        {...rest}
    >
        {children}
    </ReactSplitPane>
)

export type SplitProps = Omit<SplitPaneProps, "children"> & {
    children: React.ReactNode[]
}
