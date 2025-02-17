import type { HTMLAttributes } from "react"
import { forwardRef } from "react"

import { bem } from "@react-md/utils"

export interface ToggleContainerProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Boolean if the input toggle should be rendered as `inline-flex` instead of
     * `flex`.
     */
    inline?: boolean

    /**
     * Boolean if the label should be stacked above/below the input toggle instead
     * of being rendered on the same line.
     */
    stacked?: boolean
}

const block = bem("rmd-toggle-container")

/**
 * The `ToggleContainer` component should generally be used around a
 * custom `"checkbox"`, `"radio"`, or `"switch"` component to help with
 * additional styles. This is mostly an internal component so I'm not
 * sure useful it will be though.
 */
export const ToggleContainer = forwardRef<HTMLDivElement, ToggleContainerProps>(
    function ToggleContainer(
        { className, inline = false, stacked = false, children, ...props },
        ref
    ) {
        return (
            <div
                {...props}
                ref={ref}
                className={cn(block({ stacked, inline }), className)}
            >
                {children}
            </div>
        )
    }
)
