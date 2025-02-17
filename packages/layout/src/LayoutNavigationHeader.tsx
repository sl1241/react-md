import type { AppBarProps } from "@react-md/app-bar"
import { AppBar, AppBarTitle } from "@react-md/app-bar"
import type { PropsWithRef } from "@react-md/utils"
import { bem } from "@react-md/utils"

import type { LayoutCloseNavigationButtonProps } from "./LayoutCloseNavigationButton"
import { LayoutCloseNavigationButton } from "./LayoutCloseNavigationButton"
import { useLayoutConfig } from "./LayoutProvider"

export interface LayoutNavigationHeaderProps<T extends HTMLElement = HTMLDivElement>
    extends Omit<AppBarProps, "title"> {
    /**
     * An optional title to display that will be wrapped in the `AppBarTitle`
     * component.
     *
     * Note: If you do not want to wrap the title with the `AppBarTitle` component
     * and want additional configuration, just provide your own `children`
     * instead.
     */
    title?: Child

    /**
     * Any additional props to provide to the `AppBarTitle` when the `title` prop
     * was provided.
     */
    titleProps?: PropsWithRef<AppBarProps, T>

    /**
     * Boolean if the header should gain a border-bottom.
     */
    disableBorderBottom?: FunctionMaybe<Nullable<boolean>>

    /**
     * An optional close navigation button to use instead of the default
     * `LayoutCloseNavigationButton`.
     */
    closeNav?: Child

    /**
     * Any props to pass to the default `LayoutCloseNavigationButton` when the
     * `closeNav` prop was omitted.
     */
    closeNavProps?: PropsWithRef<
        LayoutCloseNavigationButtonProps,
        HTMLButtonElement
    >
}

const styles = bem("rmd-layout-nav-header")

/**
 * The default implementation for the `AppBar` within the `LayoutNavigation`
 * that allows for rendering a title along with the `LayoutCloseNavigationButton`.
 */
export const LayoutNavigationHeader = (
    {
        theme = "clear",
        children,
        className,
        closeNav,
        closeNavProps,
        title: propTitle,
        titleProps,
        disableBorderBottom = false,
        ref,
        ...props
    }: LayoutNavigationHeaderProps<HTMLDivElement>
) => {
    const { layout } = useLayoutConfig()
    if (layout === "clipped" || layout === "floating") {
        return null
    }

    let title: Child = null
    if (propTitle) {
        title = <AppBarTitle {...titleProps}>{propTitle}</AppBarTitle>
    }

    let action = closeNav
    if (typeof action === "undefined") {
        action = <LayoutCloseNavigationButton {...closeNavProps} />
    }

    return (
        <AppBar
            {...props}
            ref={ref}
            theme={theme}
            className={[styles({ bordered: !disableBorderBottom }), className]}
        >
            {title}
            {children}
            {action}
        </AppBar>
    )
}