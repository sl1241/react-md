import { bem } from "@react-md/utils"

const block = bem("rmd-card")

/**
 * This component is used to dynamically add addons to the `CardHeader`
 * component. When no children are provided, nothing will be rendered.
 *
 * @internal
 */
export function CardHeaderAddon({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLSpanElement>): Element | null {
    if (!children) {
        return null
    }

    return (
        <span {...props} className={[block("header-addon"), className]}>
            {children}
        </span>
    )
}
