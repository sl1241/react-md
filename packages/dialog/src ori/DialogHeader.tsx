import type { HTMLAttributes } from "react"
import { forwardRef } from "react"

import { bem } from "@react-md/utils"

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>

const block = bem("rmd-dialog")

/**
 * This component doesn't do anything to complex. It really just applies custom
 * styles so that when the `DialogContent` component is used, the header will be
 * "fixed" to the top of the dialog while the content scrolls. It also applies
 * some minimal padding.
 */
export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
    function DialogHeader({ children, className, ...props }, ref) {
        return (
            <header {...props} ref={ref} className={cn(block("header"), className)}>
                {children}
            </header>
        )
    }
)
