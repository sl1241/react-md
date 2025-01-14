import type { HTMLAttributes } from "react"
import { Children, cloneElement, forwardRef, isValidElement } from "react";
;

import { bem } from "../bem"

export interface GridListCellProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Boolean if the className should be cloned into the child instead of
     * wrapping in another div. This will only work if the `children` is a single
     * ReactElement.
     */
    clone?: boolean

    /**
     * Boolean if the cell should be square by also setting the current cell size
     * to the `height`.
     */
    square?: boolean
}

const block = bem("rmd-grid-list")

export const GridListCell = forwardRef<HTMLDivElement, GridListCellProps>(
    function GridListCell(
        { className, children, square = false, clone = false, ...props },
        ref
    ) {
        const cellClassName = cn(block("cell", { square }), className)
        if (clone && isValidElement(children)) {
            const child = Children.only(children)
            return cloneElement(child, {
                className: cn(cellClassName, child.props.className),
            } as HTMLAttributes<HTMLDivElement>)
        }

        return (
            <div {...props} ref={ref} className={cellClassName}>
                {children}
            </div>
        )
    }
)
