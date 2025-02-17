import { createContext, $, useContext, useEffect, useMemo, $$, } from 'voby'
import { useAppSize } from "@react-md/utils"
import '@react-md/react'

import {
    DEFAULT_DESKTOP_LAYOUT,
    DEFAULT_LANDSCAPE_TABLET_LAYOUT,
    DEFAULT_PHONE_LAYOUT,
    DEFAULT_TABLET_LAYOUT,
} from "./constants"
import type { LayoutConfiguration, SupportedWideLayout } from "./types"
import {
    getLayoutType,
    isMiniLayout,
    isPersistentLayout,
    isToggleableLayout,
} from "./utils"
import '@react-md/react'

/**
 * @internal
 */
const notInitialized = (name: string) => (): void => {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== "production") {
        /* eslint-disable no-console */
        console.warn(
            "Uh oh, something went wrong. Somehow the `LayoutNavigationConfiguration` context has not been initialized. " +
            `This caused the "${name}" callback to do nothing.`
        )
    }
}

export interface LayoutContext {
    /**
     * The root `id` that was passed to the `Layout` component so that `id`s can
     * be generated for child components.
     */
    baseId: FunctionMaybe<string>

    /**
     * The current layout that is being used based on the app's size.
     */
    layout: FunctionMaybe<SupportedWideLayout>

    /**
     * Boolean if the navigation panel is currently visible. This will always be
     * `true` for persist layout types on desktop.
     */
    visible: FunctionMaybe<boolean>

    /**
     * A function that will set the `visible` state to `true`.
     */
    showNav(): void

    /**
     * A function that will set the `visible` state to `false`.
     */
    hideNav(): void

    /**
     * Boolean if the layout is currently using a fixed app bar which can be
     * useful for determining specific scroll or layout behavior.
     *
     * @remarks \@since 2.8.3
     */
    fixedAppBar: FunctionMaybe<boolean>

    /**
     * Boolean if one of the layout types are mini. This is mostly used internally
     * to prevent the `<main>` element from unmounting (and losing state) for
     * non-fixed app bar layouts.
     *
     * @remarks \@since 2.9.1
     */
    isMiniable: FunctionMaybe<boolean>
}

const context = createContext<LayoutContext>({
    baseId: "layout",
    layout: "temporary",
    visible: false,
    showNav: notInitialized("showNav"),
    hideNav: notInitialized("hideNav"),
    fixedAppBar: true,
    isMiniable: false,
})

/**
 * Gets the current layout state and configuration.
 */
export function useLayoutConfig(): LayoutContext {
    return useContext(context)
}

const { Provider } = context

export interface LayoutProviderProps extends LayoutConfiguration {
    /**
     * The base id for the layout component. This is required since all the child
     * components use this to generate their ids.
     */
    baseId: FunctionMaybe<string>

    /**
      * The children to render that can inherit the current layout.
      */
    children: Children

    /** {@inheritDoc LayoutContext.fixedAppBar} */
    fixedAppBar?: FunctionMaybe<Nullable<boolean>>
}

/**
 * @remarks \@since 2.6.0
 * @internal
 */
function isToggleableVisible(
    behavior: boolean | "toggleable" | "toggleable-mini",
    layout: SupportedWideLayout
): boolean {
    return typeof behavior === "string"
        ? behavior === layout
        : behavior && isToggleableLayout(layout)
}

/**
 * Determines the current layout based on the `LayoutConfiguration` and hooks
 * into the `AppSizeListener` to update on resize. This also initializes the
 * `LayLayoutContext` so that a custom layout implementation can be used along
 * with the `useLayoutConfig()` hook and the multiple `Layout` components.
 */
export function LayoutProvider({
    baseId,
    phoneLayout = DEFAULT_PHONE_LAYOUT,
    tabletLayout = DEFAULT_TABLET_LAYOUT,
    landscapeTabletLayout = DEFAULT_LANDSCAPE_TABLET_LAYOUT,
    desktopLayout = DEFAULT_DESKTOP_LAYOUT,
    largeDesktopLayout,
    defaultToggleableVisible: dtv = false,
    fixedAppBar = true,
    children,
}: LayoutProviderProps): Element {
    const defaultToggleableVisible = $$(dtv)

    const appSize = useAppSize()
    const layout = getLayoutType({
        appSize,
        phoneLayout,
        tabletLayout,
        landscapeTabletLayout,
        desktopLayout,
        largeDesktopLayout,
    })
    const isMiniable = [
        phoneLayout,
        tabletLayout,
        landscapeTabletLayout,
        desktopLayout,
        largeDesktopLayout,
    ].some((layout) => !!layout && isMiniLayout(layout))

    const { isDesktop } = appSize
    const visible = $((isPersistentLayout(layout) && $$(isDesktop)) ||
        isToggleableVisible(defaultToggleableVisible, layout))

    useEffect(() => {
        visible(
            isPersistentLayout(layout) ||
            isToggleableVisible(defaultToggleableVisible, layout)
        )
    })

    const showNav = $(() => {
        visible(true)
    })

    const hideNav = $(() => {
        if (!isPersistentLayout(layout)) {
            visible(false)
        }
    })

    const value = useMemo<LayoutContext>(() => ({
        baseId,
        layout,
        visible,
        showNav,
        hideNav,
        fixedAppBar,
        isMiniable,
    }))

    return <Provider value={value}>{children}</Provider>
}
