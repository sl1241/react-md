import type { HTMLAttributes, ReactElement } from "react"


import styles from "./Container.module.scss"

export default function Container({
    children,
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>): Child {
    return (
        <div className={cn(styles.container, className)} {...props}>
            {children}
        </div>
    )
}